import React from 'react'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Grid from '@material-ui/core/Grid'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { userLogIn } from '../redux/actions'

class Header extends React.Component{
    constructor(props){
        super(props);

    }

    createAccount=()=>{
        this.props.history.push('/createAccount')
    }
    
    logIn=()=>{
        this.props.history.push('/logIn')
    }

    parkings=()=>{
        this.props.history.push('/parkings')
    }

    logOut=()=>{
        this.props.userLogIn(undefined);
        this.props.history.push("/");
    }


    render(){ 

        return(
        <div style={{width: "100%"}}>
        <AppBar position='static' style={{ background: '#ffffff' }}>
            <Toolbar>
                <Typography variant='h5' style={{ color: '#565656',width:'50%' }}>
                 Parkly
                </Typography>
                {this.props.user===undefined ?
                    <ButtonGroup variant="text" style={{ backgroundColor: '#ffffff',color:'#565656',width:'50%',justifyContent:'flex-end'}}>
                        <Button
                            onClick={this.logIn}>
                            log in
                        </Button>
                        <Button
                            onClick={this.createAccount}>
                            sign up
                        </Button>
                    </ButtonGroup>:
                    <ButtonGroup variant="text" style={{ backgroundColor: '#ffffff',color:'#565656',width:'50%',justifyContent:'flex-end'}}>
                        <Button
                            onClick={this.parkings}>
                            parkings
                        </Button>
                        <Button
                            onClick={this.logOut}>
                            log out
                        </Button>
                    </ButtonGroup>}
            </Toolbar>
        </AppBar>
        </div>
        )
    }
}
const mapStateToProps = (state /*, ownProps*/) => {
    return {
      user:state.user,
    }
  }
  
const mapDispatchToProps = (dispatch) => ({
    userLogIn: user => dispatch(userLogIn(user))
})
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Header))