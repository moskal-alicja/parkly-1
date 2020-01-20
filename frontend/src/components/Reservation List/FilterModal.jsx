import React from 'react'

import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import  Card  from '@material-ui/core/Card'
import Slider from '@material-ui/core/Slider'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'

import { withStyles } from '@material-ui/styles'


const styles={
    grid:{
        height:'100%'
    },

    card:{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        height: '480px',
        width: '350px',
        backgroundColor: '#ffffff'

    },

    field:{
        backgroundColor:'#ffffff',
        width:'80%',
        margin:'10px',
        '& p':{
            color:'#000000',
          },
       
    },

    slider:{
        width:'80%',
        marginBottom:'10px'
    },

    
    button:{
      backgroundColor:'#ffffff',
        color:'#888888',
        height: '50px',
        width:'30%',
        marginTop:'5%'
    },
}


function ValueLabelComponent(props) {
    const { children, open, value } = props;
  
    return (
      <Tooltip open={open} enterTouchDelay={0} placement="top" title={value+' PLN'}>
        {children}
      </Tooltip>
    );
}

class FilterModal extends React.Component{
    constructor(props){
        super(props)

        this.state={
            totalCost:[100,450],
            city:'',
            street:''
        }
    }

    clickFilter=()=>{
        this.props.filterClick(this.state.city,this.state.street,this.state.totalCost)
    }

    clickCancel=()=>{
        this.props.cancelClick()
    }

    render(){

        const {
            card,
            grid,
            field,
            slider,
            button
        }=this.props.classes

        const{
            totalCost,
            city,
            street
        }=this.state
        return(
            <Card
                className={card}>
                <Grid
                    className={grid}
                    container
                    direction="column"
                    justify="center"
                    alignItems="center">

                    <Typography 
                        variant='h5'
                        style={{margin:'0px 0px 50px 0px'}}>
                        Filter
                    </Typography>
                    <TextField
                        label={'City'}
                        type={'text'}
                        onChange={e => this.setState({city:e.target.value})}
                        value={city}
                        className={field}
                        variant={'outlined'}
                        />
                    <TextField
                        label={'Street'}
                        type={'text'}
                        onChange={e => this.setState({street:e.target.value})}
                        value={street}
                        className={field}
                        variant={'outlined'}
                        />
                    <Typography id="range-slider" 
                                gutterBottom
                                variant='overline'
                                style={{margin:'20px 0px 0px 0px'}}>
                        Profit
                    </Typography>
                     <Slider
                        aria-labelledby="range-slider"
                        value={totalCost}
                        className={slider}
                        onChange={ (e,newValue) => this.setState({totalCost: newValue})}
                        // valueLabelDisplay="auto"
                        // valueLabelFormat={(value,index)=>{return `${value}PLN`}}
                        ValueLabelComponent={ValueLabelComponent}
                        step={10}
                        min={0}
                        max={1000}
                    />
                    <Grid
                        container
                        direction="row"
                        justify="space-around"
                        alignItems="center">
                        <Button
                            className={button}
                            onClick={this.clickCancel}
                            variant='contained'>
                            cancel
                        </Button>
                        <Button
                            className={button}
                            onClick={this.clickFilter}
                            variant='contained'>
                            filter
                        </Button>
                    </Grid>
                </Grid>
            </Card>
        )
    }
}

export default withStyles(styles)(FilterModal)