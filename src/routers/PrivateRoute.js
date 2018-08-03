import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({
    isAuth,
    component: Component,
    ...rest
}) => (
    <Route {...rest} component={(props) =>(
        isAuth ? (
            <Component {...props} />
        ) : (
            <Redirect to="/" />
        )
    )} />
);

const mapStateToProps = (state) => ({
    isAuth: state.auth.token
})

export default connect(mapStateToProps)(PrivateRoute);