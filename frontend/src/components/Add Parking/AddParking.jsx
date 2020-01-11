import React from 'react'


import Header from '../Header'
import AddressModal from './AddressModal'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import  Card  from '@material-ui/core/Card'
import InputAdornment from '@material-ui/core/InputAdornment'
import AddIcon from '@material-ui/icons/Add'

import DateFnsUtils from '@date-io/date-fns';
import { TimePicker, MuiPickersUtilsProvider} from '@material-ui/pickers'

import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { parkingAdded } from '../../redux/actions'


const styles = {
    
    card:{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        height: '550px',
        width: '450px',
        square:'true',
        backgroundColor: '#ffffff'

    },

    grid:{
        flexBasis: '20%',
        height:'100%'
    },

    
    field:{
        backgroundColor:'#ffffff',
        width:'80%',
        margin:'10px',
        '& p':{
            color:'#000000',
          },
       
    },

    button:{
        backgroundColor:'#ffffff',
        color:'#888888',
        height: '50px',
        width:'60%',
        margin:'40px'
    },
    
    header:{
        color:'primary',
        margin:'5%'
    },

    timer:{
        width:'30%',
        margin:'10px',
    }


}


class AddParking extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            city:'',
            street:'',
            number:'',
            spotsNumber:0,
            price:0,
            opens:new Date('2004-02-12T00:00:00+00:00'),
            closes:new Date('2004-02-12T00:00:00+00:00'),
            addressModal:false
        }
    }
    setAddress=address=>{
        this.setState({
            city:address.city,
            street:address.street,
            number:address.number,
            addressModal:false
        })
    }
    clickAdd=()=>{
        const {
            city,
            street,
            number,
            spotsNumber,
            price,
            opens,
            closes
        } = this.state

        const parking={
            id: Date.now(),
            city,
            street,
            number,
            spotsNumber,
            price,
            opens,
            closes
        }
        fetch('http://localhost:3004/parkings', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(parking)
        })
        .then(e=>this.props.parkingAdded(parking))
        .then(e=>this.props.history.push("/parkings"))
    }
    render(){
        const {
            city,
            street,
            number,
            spotsNumber,
            price,
            opens,
            closes,
            addressModal
        } = this.state
        
        const {
            card,
            grid,
            field,
            button,
            header,
            timer
        }=this.props.classes
        
        
        return(
            <>
            {addressModal?
            <AddressModal setAddress={this.setAddress} city={city} street={street} number={number}/>:
            <>
            <Header/>
            <Card
                className={card}>
                <Grid
                    className={grid}
                    container
                    direction="column"
                    justify="center"
                    alignItems="center">
                    <Typography className={header}>
                        ADD NEW PARKING
                    </Typography>
                    <TextField
                            label={'Address'}
                            value={city?street+' '+number+', '+city:''}
                            className={field}
                            fullWidth
                            variant={'outlined'}
                            InputProps={{
                                endAdornment: <InputAdornment position='end'>
                                    <AddIcon
                                        onClick={e=>this.setState({addressModal:true})}/>
                                    </InputAdornment>,                                    
                                    readOnly: true,
                                }}
                        />
                    <TextField
                        label={'Number of spots'}
                        type={'number'}
                        onChange={e => this.setState({spotsNumber:e.target.value})}
                        value={spotsNumber}
                        className={field}
                        fullWidth
                        variant={'outlined'}
                        InputProps={{ inputProps: { min: 0} }}
                        />
                    <TextField
                        label={'Price per hour'}
                        type={'number'}
                        onChange={e => this.setState({price:e.target.value})}
                        value={price}
                        className={field}
                        fullWidth
                        variant={'outlined'}
                        InputProps={{
                            endAdornment: <InputAdornment position='end'>PLN</InputAdornment>,
                            inputProps: { min: 0}
                            }}
                        />

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid
                            container
                            direction='row'
                            justify='space-around'
                            alignItems='center'>
                         
                            <TimePicker
                                margin="normal"
                                label="Opens"
                                value={opens}
                                onChange={date => this.setState({opens:date})}
                                className={timer}
                                />
                            
                            <TimePicker
                                margin="normal"
                                label="Closes"
                                value={closes}
                                onChange={date=>this.setState({closes:date})}
                                className={timer}
                                />
                                
                        </Grid>
                    </MuiPickersUtilsProvider>
                    
                    <Button
                        onClick={this.clickAdd}
                        className={button}
                        variant={'contained'}
                        color={'primary'}
                        disabled={!city}
                        >
                        add
                    </Button>
                </Grid>
            </Card>
            </>}
            </>
        )
    }
}
const mapDispatchToProps = (dispatch) => ({
    parkingAdded: parking => dispatch(parkingAdded(parking))
})
export default withRouter(connect(
    null,
    mapDispatchToProps
)(withStyles(styles)(AddParking)))