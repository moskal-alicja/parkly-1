import React from 'react'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import  Card  from '@material-ui/core/Card'
import IconButton from '@material-ui/core/IconButton'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'
import EditIcon from '@material-ui/icons/Edit'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday'
import DehazeIcon from '@material-ui/icons/Dehaze'

import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { parkingDeleted } from '../../redux/actions'

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
        height:'45px'
    }
}
class ParkingModal extends React.Component{
    constructor(props){
        super(props);
    }

    deleteParking=()=>{
        fetch('http://localhost:3004/parkings/'+this.props.parking.id, {
            method: 'DELETE',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({id: this.props.parking.id})})
            .then(e=>this.props.parkingDeleted(this.props.parking))
    }

    editParking=()=>{
        this.props.history.push("/editParking")
    }

    render(){

        const {
            grid1,
            grid,
            maingrid,
            card
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
                    
                    <Typography variant='overline'>
                        {spotsNumber}
                    </Typography>
                </Grid>

                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    className={grid}>

                    <Typography variant='overline'>
                        {price}
                    </Typography>
                </Grid>
                

                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    className={grid}>
                    
                    <Typography variant='overline'>
                        {new Date(opens).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})+' - '+
                        new Date(closes).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})}
                    </Typography>
                </Grid>
                <IconButton
                    style={{flexBasis: '5%'}}>
                    <CalendarTodayIcon/>
                </IconButton>
                <IconButton
                    style={{flexBasis: '5%'}}>
                    <DehazeIcon/>
                </IconButton>
                <IconButton
                    style={{flexBasis: '5%'}}>
                    <EditIcon
                        onClick={this.editParking}/>
                </IconButton>
                <IconButton
                    style={{flexBasis: '5%'}}>
                    <DeleteOutlineOutlinedIcon
                        onClick={this.deleteParking}/>
                </IconButton>
            </Grid>
        </Card>)
    }
}
const mapDispatchToProps = (dispatch) => ({
    parkingDeleted: parking => dispatch(parkingDeleted(parking)),
})
export default withRouter(connect(
    null,
    mapDispatchToProps)(withStyles(styles)(ParkingModal)))