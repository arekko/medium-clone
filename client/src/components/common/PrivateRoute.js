import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';


const PrivateRoute = ({ component: Component, auth, ...rest}) => (
    <Route 
    {...rest} 
    render = {props => 
        auth.isAuthenticated === true ? (
            <Component {...props} />
        ) : (
            <Redirect to="/" />
        )
    }
    
    />
)


const mapStateToProps = ({auth}) => ({
  auth
})

export default connect(mapStateToProps)(PrivateRoute)