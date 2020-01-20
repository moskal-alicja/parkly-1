import React from 'react'

import Grid from '@material-ui/core/Grid'
import  Card  from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'

import { withStyles } from '@material-ui/core/styles'

const styles={
    
    grid:{
        flexBasis: '10%',
        height:'100%'
    },

    grid1:{
        flexBasis: '30%',
        height:'100%' 
    },
    grid2:{
        flexBasis: '14%',
        height:'100%' 
    },
    maingrid:{
        height:'100%' 
    },
    card:{
        margin:'8px 0px',
        height:'75px'
    },
}

function getISOStringDate(date) {
    const dateAndTime = date.toISOString().split('T')
    
    return dateAndTime[0]
}

function getISOStringTime(date) {
    const dateAndTime = date.toISOString().split('T')
    const time = dateAndTime[1].split(':')
    const hour=parseInt(time[0])
    if(hour>12)
        return (hour-12)+':'+time[1]+' PM'
    
    return time[0]+':'+time[1]+' AM'
}

class ReservationModal extends React.Component{

    constructor(props){
        super(props);
    }
    render(){
        const{
            grid2,
            grid1,
            grid,
            maingrid,
            card,
        }=this.props.classes

        const{
            id,
            dateFrom,
            dateTo,
            userFirstName,
            userLastName,
            userEmail,
            userToken,
            createdAt,
            city,
            street,
            streetNumber,
            totalCost,
        }=this.props.reservation
        
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
                            {city+','+street+' '+streetNumber}
                        </Typography>
                    </Grid>
                        
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                        className={grid1}>  
                        <Typography variant='overline'>
                            {userFirstName+' '+userLastName}
                        </Typography>
                                
                    </Grid>

                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                        className={grid}>
                        <Typography variant='overline'>
                            {totalCost+' PLN'}
                        </Typography>
                    </Grid>                 
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="flex-end"
                        className={grid2}>
                        <Typography variant='overline'>
                            {getISOStringDate(new Date(dateFrom))}
                        </Typography>
                        <Typography variant='overline'>
                            {getISOStringTime(new Date(dateFrom))}
                        </Typography>
                    </Grid>
                    <Typography 
                        variant='overline'
                        style={{flexBasis:'2%',textAlign:'center'}}>
                         -
                    </Typography>
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="flex-start"
                        className={grid2}>
                        <Typography variant='overline'>
                            {getISOStringDate(new Date(dateTo))}
                        </Typography>
                        <Typography variant='overline'>
                            {getISOStringTime(new Date(dateTo))}
                        </Typography>
                    </Grid>
                </Grid>
            </Card>
        )
    }
}

export default withStyles(styles)(ReservationModal)