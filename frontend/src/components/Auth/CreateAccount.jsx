import React  from 'react'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import  Card  from '@material-ui/core/Card'

import Header from '../Header'

import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'

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
        overflow: 'hidden'
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
        margin:'80px 0px 40px 0px'

    },


}

const emailRegEx = new RegExp('[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}')
const phoneRegEx = new RegExp('^[0-9]{9}$')


class CreateAccount extends React.Component{
    constructor(props){
        super(props)
        this.state={
            email:'',
            emailError:'',

            password:'',
            passwordError:'',

            passwordConfirm:'',
            passwordConfirmError:'',
            
            phoneNumber:'',
            phoneNumberError:'',
            
            name:'',
            
            surname:'',

            firstPage:true,
        }
    }
    clickRegister = () => {
        const {
            email,
            password,
            phoneNumber,
            name,
            surname,
        }=this.state

        const user = { 
            id: Date.now(),
            email, 
            password,
            phoneNumber,
            name,
            surname
        };
        //zapisz do bazy(do zmiany)
        //haslo musi byc hashowane(do zmiany)

        fetch('http://localhost:3004/users', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res=>this.props.history.push('/'))
    }
    
    clickNext=()=>{
    
        //sprawdzenie czy user o takim mailu jest juz w bazie(do zminay)
        fetch("http://localhost:3004/users")
        .then(res => res.json())
        .then(data => data.find(user => user.email===this.state.email))
        .then(result=>{
            if(result===undefined)
                this.setState({firstPage:false})

            else
                this.setState({emailError:'Email is already taken'})
        })
        
    }
    validateEmail=(value)=>{

        
        if (!value.match(emailRegEx) && value.length>0) 
        {
            this.setState({ emailError:'Wrong format' })
        } 
        else 
        {
            this.setState({ emailError: '' })
        }


    }

    validatePhoneNumber=(value)=>{
        
        if (!value.match(phoneRegEx) && value.length>0) 
        {
            this.setState({ phoneNumberError:'Wrong format' })
        } 
        else 
        {
            this.setState({ phoneNumberError: '' })
        }
    }

    validatePassword=(value)=>{

        
        if (value.length<8) 
        {
            this.setState({ passwordError:'Password must be at least 8 characters long' })
        } 
        else 
        {
            this.setState({ passwordError: '' })
        }


    }

    checkPasswords=(value)=>{
        if(value!=this.state.password)
        {
            this.setState({passwordConfirmError:'Passwords do not match'})
        }

        else
        {
            this.setState({passwordConfirmError:''})
        }
    }
    
    render(){
        const { 
            email,
            emailError,
            password,
            passwordError,
            passwordConfirm,
            passwordConfirmError,
            phoneNumber,
            phoneNumberError,
            name,    
            surname,
            firstPage,
        } = this.state

        const {
            card,
            grid,
            field,
            button,
            header,
        }=this.props.classes
        
        const canSubmit = !emailError && !passwordError && !passwordConfirmError
        const emptyField =  !email || !password || !passwordConfirm

        return (
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
                        SIGN UP
                    </Typography>

                        {firstPage ?
                        <>
                        <TextField
                            label={'Email'}
                            onChange={e => {this.setState({email:e.target.value}); this.validateEmail(e.target.value)}}
                            value={email}
                            error={emailError.length>0}
                            className={field}
                            helperText={emailError}
                            fullWidth
                            variant={'outlined'}
                        />
                        <TextField
                            label={'Password'}
                            type={'password'}
                            onChange={e =>{ this.setState({password:e.target.value}); this.validatePassword(e.target.value)}}
                            value={password}
                            error={passwordError.length>0}
                            className={field}
                            helperText={passwordError}
                            fullWidth
                            variant={'outlined'}
                        />
                        <TextField
                            label={'Confirm password'}
                            type={'password'}
                            onChange={e =>{this.setState({passwordConfirm:e.target.value}); this.checkPasswords(e.target.value)}}
                            value={passwordConfirm}
                            error={passwordConfirmError.length>0}
                            className={field}
                            helperText={passwordConfirmError}
                            fullWidth
                            variant={'outlined'}
                        />
                        <Button
                            onClick={this.clickNext}
                            className={button}
                            disabled={!canSubmit || emptyField}
                            variant={'contained'}
                            color={'primary'}
                        >
                            next
                        </Button>
                    </>:<>
                    <TextField
                            label={'Name'}
                            onChange={e => this.setState({name:e.target.value})}
                            value={name}
                            className={field}
                            fullWidth
                            variant={'outlined'}
                        />
                        <TextField
                            label={'Surname'}
                            onChange={e => this.setState({surname:e.target.value})}
                            value={surname}
                            className={field}
                            fullWidth
                            variant={'outlined'}
                        />
                        <TextField
                            label={'Phone number'}
                            type={'tel'}
                            onChange={e =>{this.setState({phoneNumber:e.target.value}); this.validatePhoneNumber(e.target.value)}}
                            value={phoneNumber}
                            error={phoneNumberError.length>0}
                            className={field}
                            helperText={phoneNumberError}
                            fullWidth
                            variant={'outlined'}
                        />
                        <Button
                            onClick={this.clickRegister}
                            className={button}
                            disabled={!name || !surname || !phoneNumber||phoneNumberError}
                            variant={'contained'}
                            color={'primary'}
                        >
                            sign up
                        </Button>
                    </>}
                    </Grid>
                </Card>
                </>
            )
    }
}

export default withRouter(withStyles(styles)(CreateAccount))
