import React from 'react'

import Header from '../Header'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import  Card  from '@material-ui/core/Card'


import { withStyles } from '@material-ui/core/styles'
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
}
class AddressModal extends React.Component{
    constructor(props){
        super(props)
        this.state={
            city:props.city,
            street:props.street,
            number:props.number
        }
    }
    clickConfirm=()=>{
        const {
            city,
            street,
            number
        }=this.state
        
        const address={
            city,
            street,
            number
        }

        this.props.setAddress(address)
    }
    render(){
        const {
            city,
            street,
            number
        }=this.state

        const {
            card,
            grid,
            field,
            button,
            header,
        }=this.props.classes
        return(
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
                        ADDRESS
                    </Typography>
                    <TextField
                            label={'City'}
                            onChange={e => this.setState({city:e.target.value})}
                            value={city}
                            className={field}
                            fullWidth
                            variant={'outlined'}
                        />
                    <TextField
                        label={'Street'}
                        onChange={e => this.setState({street:e.target.value})}
                        value={street}
                        className={field}
                        fullWidth
                        variant={'outlined'}
                        />
                    <TextField
                        label={'Number'}
                        type={'number'}
                        onChange={e => this.setState({number:e.target.value})}
                        value={number}
                        className={field}
                        fullWidth
                        variant={'outlined'}
                        InputProps={{inputProps: { min: 1}}}
                        />
                    
                    <Button
                        onClick={this.clickConfirm}
                        className={button}
                        variant={'contained'}
                        color={'primary'}
                        disabled={!city || !street || !number}
                        >
                        confirm
                    </Button>
                </Grid>
            </Card>
            </>)
    }
}

export default withStyles(styles)(AddressModal)