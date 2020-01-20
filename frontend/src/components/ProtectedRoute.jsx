import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'

const ProtectedRoute = ({ requires, user, isLoggedIn, component: Component, ...props }) => {
    return (
        <Route
            {...props}
            render={componentProps => (
                user!=undefined ? <Component {...componentProps}/> : <Redirect to={'/'}/>
            )}
        />
    )
}

const mapStateToProps = state => ({
    user: state.user,
})

export default connect(mapStateToProps)(ProtectedRoute)