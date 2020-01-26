import React from 'react'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import  Card  from '@material-ui/core/Card'
import Divider from '@material-ui/core/Divider';

import Header from '../Header'

import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { userLogIn, fetchParkings,fetchReservations } from '../../redux/actions'


var passwordHash = require('password-hash');

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
        flexBasis: '25%',
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
        margin:'11%'
    },


}
class LogIn extends React.Component{
    constructor(props){
        super(props)
        this.state={
            email:'',
            emailError:'',
            password:'',
        }
    }

    clickLogIn=()=>{


         fetch('http://localhost:8080/parking-owner/login', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'user_name':'parkly',
              'email':this.state.email,
              'password':this.state.password
            },
          })
          .then((response) => {
              if(response.status===401)
              {
                this.setState({emailError:'niepoprawne haslo dla danego emaila'})
                return;
              }
              else{
                  return response.json();
              }
            })
            .then((result) => {
                this.props.userLogIn(result);
                this.props.fetchParkings(result.id,result.userToken);
                this.props.history.push("/parkings");
            })
            .catch((error) => {
            console.error('Error:', error);
});
    }

    render(){
        const { 
            email,
            emailError,
            password,
        } = this.state

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
                        LOGIN
                    </Typography>
                    <Divider/>
                    <TextField
                            label={'Email'}
                            onChange={e => this.setState({email:e.target.value})}
                            value={email}
                            error={emailError.length>0}
                            helperText={emailError}
                            className={field}
                            variant={'outlined'}
                        />
                    <TextField
                        label={'Password'}
                        type={'password'}
                        onChange={e => this.setState({password:e.target.value})}
                        value={password}
                        className={field}
                        variant={'outlined'}
                    />
                    <Button
                        onClick={this.clickLogIn}
                        className={button}
                        disabled={email.length===0 || password.length===0}
                        variant={'contained'}
                        color={'primary'}
                        >
                        login
                    </Button>
                </Grid>
            </Card>
            </>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    userLogIn: user => dispatch(userLogIn(user)),
    fetchParkings: (id,token)=>dispatch(fetchParkings(id,token)),
    fetchReservations: ()=>dispatch(fetchReservations())
})

export default withRouter(connect(
    null,
    mapDispatchToProps
)(withStyles(styles)(LogIn)))
