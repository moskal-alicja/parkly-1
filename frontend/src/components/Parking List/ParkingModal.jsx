import React from 'react'

import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import  Card  from '@material-ui/core/Card'
import IconButton from '@material-ui/core/IconButton'

import Tooltip from '@material-ui/core/Tooltip'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'
import EditIcon from '@material-ui/icons/Edit'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday'
import DehazeIcon from '@material-ui/icons/Dehaze'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'

import DateFnsUtils from '@date-io/date-fns'
import { TimePicker, MuiPickersUtilsProvider} from '@material-ui/pickers'

import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { parkingDeleted,parkingEdited } from '../../redux/actions'

const styles={
    grid1:{
        flexBasis: '35%',
        height:'100%' 
    },
    grid:{
        flexBasis: '15%',
        height:'100%'
    },
    maingrid:{
        height:'100%' 
    },
    card:{
        margin:'8px 0px',
        height:'75px'
    },
    
    field:{
        backgroundColor:'#ffffff',
        width:'80%',
        margin:'10px',
        '& p':{
            color:'#000000',
          },
    },

    timer:{
        width:'80%'
    },

    input:{
          
        fontSize: '0.75rem',
        fontFamily: [
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
        ].join(','),
        fontWeight: 400,
        lineHeight: 2.66,
        letterSpacing: '0.08333em',
        textTransform: 'uppercase',
        textAlign: 'center',
    },
}

const numberRegEx = new RegExp('^[0-9]+$')
class ParkingModal extends React.Component{
    constructor(props){
        super(props);
        this.state={
            editMode:false,
            iSpotsNumber:props.parking.spotsNumber,
            iPrice:this.props.parking.price,
            iOpens:new Date(props.parking.opens),
            iCloses:new Date(props.parking.closes),
            priceError:'',
            spotsNumberError:''
        }
    }

    deleteParking=()=>{
        fetch('http://localhost:3004/parkings/'+this.props.parking.id, {
            method: 'DELETE',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({id: this.props.parking.id})})
            .then(e=>this.props.parkingDeleted(this.props.parking))
    }

    checkClick=()=>{

        let isOK=true

        console.log(this.state.iPrice)

        if(!this.state.iPrice.toString().match(numberRegEx))
        {
            this.setState({priceError:'Wrong format'})
            isOK=false;
        }
        else
        {
            this.setState({priceError:''})

        }

        if(!this.state.iSpotsNumber.toString().match(numberRegEx))
        {
            this.setState({spotsNumberError:'Wrong format'})
            isOK=false
        }
        else
            this.setState({spotsNumberError:''})

        if(isOK)
        {
            const parking={
                id: this.props.parking.id,
                city: this.props.parking.city,
                street: this.props.parking.street,
                number: this.props.parking.number,
                spotsNumber:parseInt(this.state.iSpotsNumber),
                price: parseInt(this.state.iPrice),
                opens: this.state.iOpens.toString(),
                closes: this.state.iCloses.toString()
            }

            this.props.parkingEdited(parking)
            //tu do bazy
            this.setState({
                editMode:false,
                iSpotsNumber:parseInt(this.state.iSpotsNumber),
                iPrice:parseInt(this.state.iPrice)})
        }

        
    }

    render(){

        const {
            grid1,
            grid,
            maingrid,
            card,
            field,
            timer,
            input
        }=this.props.classes

        const {
            city,
            street,
            number,
            spotsNumber,
            price,
            opens,
            closes
        } = this.props.parking

        const{
            editMode,
            iSpotsNumber,
            iPrice,
            iOpens,
            iCloses,
            priceError,
            spotsNumberError
        }=this.state
        return(
        <Card
            className={card}>
            <Grid  
                container
                direction="row"
                justify="center"
                alignItems="center"
                className={maingrid}>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    className={grid1}>

                    <Typography variant='overline' align='justify'>
                        {city+','+street+' '+number}
                    </Typography>
                </Grid>
                    
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    className={grid}>
                    {editMode?
                        <TextField
                            type={'tel'}
                            inputStyle={{color:'#ff00ff'}}
                            onChange={e => this.setState({iSpotsNumber: e.target.value})}
                            value={iSpotsNumber}
                            className={field}
                            error={spotsNumberError.length>0}
                            helperText={spotsNumberError}
                            InputProps={{
                                classes: {
                                    input: input
                                }
                              }}
                            />
                        
                        :<Typography variant='overline'>
                            {spotsNumber}
                        </Typography>
                    }          
                </Grid>

                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    className={grid}>
                    {editMode?
                        <TextField
                            type={'tel'}
                            onChange={e => this.setState({iPrice: e.target.value})}
                            value={iPrice}
                            className={field}
                            error={priceError.length>0}
                            helperText={priceError}
                            InputProps={{
                                classes: {
                                    input: input
                                }
                              }}/>                    
                        :<Typography variant='overline'>
                            {price+' PLN'}
                        </Typography>}
                </Grid>
                 
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                        className={grid}>

                        {editMode?
                            <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="center">
                                <TimePicker
                                    value={iOpens}
                                    onChange={date => this.setState({iOpens:date})}
                                    minutesStep={60}
                                    className={timer}
                                    InputProps={{
                                        classes: {
                                            input: input
                                        }
                                      }}
                                    />
                                
                                <TimePicker
                                    value={iCloses}
                                    onChange={date=>this.setState({iCloses:date})}
                                    minutesStep={60}
                                    className={timer}
                                    InputProps={{
                                        classes: {
                                            input: input
                                        }
                                      }}
                                    />
                            </Grid>
                        :<Typography variant='overline'>
                            {new Date(opens).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})+' - '+
                            new Date(closes).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})}
                        </Typography>}
                    </Grid>
                </MuiPickersUtilsProvider>
                <div style={{flexBasis: '8%'}}/>
                {editMode?<>
                    <Tooltip title="Save">
                        <IconButton
                            style={{flexBasis: '6%'}}
                            onClick={this.checkClick}
                            >
                            <CheckIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Reject">
                        <IconButton
                            style={{flexBasis: '6%'}}
                            onClick={e=>this.setState({editMode: false})}>
                            <CloseIcon/>
                        </IconButton>
                    </Tooltip>
                </>:<>
                    <Tooltip title="Reservations">
                        <IconButton
                            style={{flexBasis: '4%'}}>
                            <DehazeIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                        <IconButton
                            style={{flexBasis: '4%'}}
                            onClick={e=>this.setState({editMode: true})}>
                            <EditIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton
                            style={{flexBasis: '4%'}}
                            onClick={this.deleteParking}>
                            <DeleteOutlineOutlinedIcon/>
                        </IconButton>
                    </Tooltip>
                </>
                }
            </Grid>
        </Card>)
    }
}
const mapDispatchToProps = (dispatch) => ({
    parkingDeleted: parking => dispatch(parkingDeleted(parking)),
    parkingEdited: parking => dispatch(parkingEdited(parking))
})
export default withRouter(connect(
    null,
    mapDispatchToProps)(withStyles(styles)(ParkingModal)))