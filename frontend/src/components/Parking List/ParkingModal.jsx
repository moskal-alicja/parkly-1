import React from 'react'

import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import  Card  from '@material-ui/core/Card'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'

import Tooltip from '@material-ui/core/Tooltip'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'
import EditIcon from '@material-ui/icons/Edit'
import DehazeIcon from '@material-ui/icons/Dehaze'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'

import DateFnsUtils from '@date-io/date-fns'
import { TimePicker, MuiPickersUtilsProvider} from '@material-ui/pickers'

import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { parkingDeleted,parkingEdited,fetchReservations } from '../../redux/actions'

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
            iOpens: new Date(2000,1,1,props.parking.opens,0,0),
            iCloses:new Date(2000,1,1,props.parking.closes,0,0),
            priceError:'',
            spotsNumberError:'',
            snackBar:false
        }
    }

    deleteParking=()=>{
        fetch('http://localhost:8080/parkings/'+this.props.parking.id, {
            method: 'DELETE',
            headers: {
                'user_name':'parkly',
                'user_token':this.props.user.userToken
                },
            })
            .then(e=>this.props.parkingDeleted(this.props.parking))
            .catch((error) => {
                console.error('Error:', error)
            })

    }
    showReservations=()=>{
        this.props.fetchReservations(this.props.parking.id,this.props.user.userToken,'parking')
        this.props.history.push('/reservations')
    }

    checkClick=()=>{

        let isOK=true


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
                opens: new Date(this.state.iOpens).getHours(),
                closes: new Date(this.state.iCloses).getHours(),
                ownerId:this.props.user.id
            }

            fetch('http://localhost:8080/parkings/'+parking.id, {
                method: 'PUT', // or 'PUT'
                headers: {
                  'Content-Type': 'application/json',
                  'user_name':'parkly',
                  'user_token':this.props.user.userToken
                },
                body: JSON.stringify(parking)
              })
              .then((response) => {
                  if(response.status===403)
                  {
                    this.setState({snackBar:true})
                    return;
                  }
                  else{
                      return response.json();
                  }
                })
                .then((result) => {
                    this.props.parkingEdited(result)
                    this.setState({
                        editMode:false,
                        iSpotsNumber:parseInt(this.state.iSpotsNumber),
                        iPrice:parseInt(this.state.iPrice)})
                })
                .catch((error) => {
                console.error('Error:', error);
                })

           
            
            //tu do bazy
           
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
            spotsNumberError,
            snackBar
        }=this.state
        return(
        <>
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
                            {new Date(2000,1,1,opens,0,0).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})+' - '+
                            new Date(2000,1,1,closes,0,0).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})}
                        </Typography>}
                    </Grid>
                </MuiPickersUtilsProvider>

                <div style={{flexBasis: '5%'}}/>
                {editMode?<div style={{flexBasis: '15%'}}>

                    <Tooltip title="Save">
                        <IconButton
                            onClick={this.checkClick}>
                            <CheckIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Reject">
                        <IconButton
                            onClick={e=>this.setState({editMode: false})}>
                            <CloseIcon/>
                        </IconButton>
                    </Tooltip>
                </div>:<div style={{flexBasis: '15%'}}>
                    <Tooltip title="Reservations">
                        <IconButton
                             onClick={this.showReservations}>
                            <DehazeIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                        <IconButton
                            onClick={e=>this.setState({editMode: true})}>
                            <EditIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton
                            onClick={this.deleteParking}>
                            <DeleteOutlineOutlinedIcon/>
                        </IconButton>
                    </Tooltip>
                </div>
                }
            </Grid>
        </Card>
        <Snackbar open={snackBar}>
        <SnackbarContent
           style={{backgroundColor: '#494949'}}
            action={(
                <IconButton onClick={e=>this.setState({snackBar: false})}>
                    <CloseIcon/>
                </IconButton>
            )}
            message='Parking cannot be edited.
            It is reserved'
        />
    </Snackbar></>)

    }
}
const mapDispatchToProps = (dispatch) => ({
    parkingDeleted: parking => dispatch(parkingDeleted(parking)),
    parkingEdited: parking => dispatch(parkingEdited(parking)),
    fetchReservations:(id,token,flag)=>dispatch(fetchReservations(id,token,flag))
})

const mapStateToProps = (state /*, ownProps*/) => {
    return {
      user:state.user,
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps)(withStyles(styles)(ParkingModal)))