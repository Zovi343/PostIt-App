import React from 'react';
import { connect } from 'react-redux'
import LoginForm from './LoginForm';
import  SignUpForm from './SingUpForm';
import LoggedIn from './LoggedIn';
import { startSignUp, startLogin, startLogout } from '../actions/auth'

class UserSection extends React.Component {
    state = {
        login: true
    }
    changeForm = () => {
        this.state.login ? this.setState(() => ({ login: false})) : this.setState(() => ({ login: true}));
    }
    onLogout = () => {
        this.props.startLogout(this.props.user.token);
    }
    onSubmitLogin = (userData) => {
        this.props.startLogin(userData);
    }
    onSubmitSignUp = (userData) => {
        this.props.startSignUp(userData);
    }
    renderCorrectPart = () => {
        if(!!this.props.user.name) {
            return <LoggedIn onLogout={this.onLogout} />
        } else if (this.state.login) {
            return <LoginForm changeForm={this.changeForm} onSubmit={this.onSubmitLogin}/>
        } else {
            return <SignUpForm changeForm={this.changeForm} onSubmit={this.onSubmitSignUp}/>
        }
    }
    render() {
        return (
            <div>
                {  
                    this.renderCorrectPart()
                }
            </div>
        )
    }
};
const mapStateToProps = (state) => ({
    user: state.auth
});

const mapDispatchToProps = (dispatch) => ({
    startSignUp: (userData) => dispatch(startSignUp(userData)),
    startLogin: (userData) => dispatch(startLogin(userData)),
    startLogout: (userToken) => dispatch(startLogout(userToken))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserSection);