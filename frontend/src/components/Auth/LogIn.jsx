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
        //znajdz email,jezeli nie ma to blad, jezeli istniej sprawdz haslo, jezeli haslo sie zgadza ->home
        //redux
        fetch('http://localhost:3004/users')
        .then(res => res.json())
        .then(data => data.find(user => user.email===this.state.email))
        .then(user=>{
            if(user===undefined)
            {
                this.setState({emailError: 'niepoprawny email'})
                return;
            }
            
            if(user.password!=this.state.password)
            {
                this.setState({emailError:'niepoprawne haslo dla danego emaila'})
                return;
            }

            console.log(passwordHash.generate('password123'))
            this.props.userLogIn(user);
            this.props.fetchParkings()
         })
         .then(e=>{
            this.props.fetchReservations();
            this.props.history.push("/parkings");
         })

         fetch('http://localhost:8080/parking-owner/login', {
            method: 'GET', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
              'user_name':'parkly',
              'email':this.state.email,
              'password':passwordHash.generate(this.state.password)
            },
          })
          .then((response) => {
              if(response.status===200)
              {
                console.log(respose.json());
                this.props.userLogIn(response.json());
                this.props.fetchParkings();//z user id
                this.props.fetchReservations();//z user id
                this.props.history.push("/parkings");

              }

              else if(respone.status===401)
              {

              }
            })
          .then((data) => {
            console.log('Success:', data);
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
    fetchParkings: ()=>dispatch(fetchParkings()),
    fetchReservations: ()=>dispatch(fetchReservations())
})

export default withRouter(connect(
    null,
    mapDispatchToProps
)(withStyles(styles)(LogIn)))
