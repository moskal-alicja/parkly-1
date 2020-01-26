import React from 'react'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { userLogIn,fetchParkings,fetchReservations } from '../redux/actions'

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

        const user=this.props.user
        this.props.fetchParkings(user.id,user.userToken)
        this.props.history.push('/parkings')
    }

    reservations=()=>{
        const user=this.props.user
        this.props.fetchReservations(user.id,user.userToken,'owner')
        this.props.history.push('/reservations')
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
                            onClick={this.reservations}>
                            reservations
                        </Button>
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
    userLogIn: user => dispatch(userLogIn(user)),
    fetchParkings: (id,token)=>dispatch(fetchParkings(id,token)),
    fetchReservations:(id,token,flag)=>dispatch(fetchReservations(id,token,flag))
})
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Header))