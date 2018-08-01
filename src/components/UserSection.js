import React from 'react';
import { connect } from 'react-redux'
import LoginForm from './LoginForm';
import  SignUpForm from './SingUpForm';
import LoggedIn from './LoggedIn';
import { startSignUp, startLogin } from '../actions/auth'

class UserSection extends React.Component {
    state = {
        login: true
    }
    changeForm = () => {
        this.state.login ? this.setState(() => ({ login: false})) : this.setState(() => ({ login: true}));
    }
    onSubmitLogin = (userData) => {
        this.props.startLogin(userData);
    }
    onSubmitSignUp = (userData) => {
        this.props.startSignUp(userData);
    }
    renderCorrectPart = () => {
        if(!!this.props.user.name) {
            return <LoggedIn />
        } else if (this.state.login) {
            return <LoginForm onSubmit={this.onSubmitLogin}/>
        } else {
            return <SignUpForm onSubmit={this.onSubmitLSignUp}/>
        }
    }
    render() {
        return (
            <div>
                {  
                    this.renderCorrectPart()
                }
                <p>OR</p>
                <button onClick={this.changeForm}>{this.state.login ? 'Sign Up!' : 'Login'}</button>
            </div>
        )
    }
};
const mapStateToProps = (state) => ({
    user: state.auth
});

const mapDispatchToProps = (dispatch) => ({
    startSignUp: (userData) => dispatch(startSignUp(userData)),
    startLogin: (userData) => dispatch(startLogin(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserSection);