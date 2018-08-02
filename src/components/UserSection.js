import React from 'react';
import { connect } from 'react-redux'
import LoginForm from './LoginForm';
import  SignUpForm from './SingUpForm';
import LoggedIn from './LoggedIn';
import { startSignUp, startLogin, startLogout, getUser } from '../actions/auth'

class UserSection extends React.Component {
    state = {
        //this determines on which form I am currently
        login: true
    };
    changeForm = () => {
        this.state.login ? this.setState(() => ({ login: false})) : this.setState(() => ({ login: true}));
    };
    componentWillMount() {
       const userToken = sessionStorage.getItem('token')
       if (userToken) {
           this.props.getUser(userToken);
       }
    };
    onLogout = () => {
        //this here ensures that user gets always redirected to the login section when logout(and not to the signup section)
        this.setState(() => ({
            login: true
        }));
        this.props.startLogout(this.props.user.token);
    };
    onSubmitLogin = (userData) => {
        this.props.startLogin(userData)
    };
    onSubmitSignUp = (userData) => {
        this.props.startSignUp(userData);
    };
    renderCorrectPart = () => {
        //second thing in OR operator in first if statement ensures that LoginForm doesn't get rendered before LoggedIn section(it would render there only for fraction of a second)
        if(!!this.props.user.name || !!sessionStorage.getItem('token')) {
            return <LoggedIn onLogout={this.onLogout} />
        } else if (this.state.login) {
            return <LoginForm authFailed={this.props.authFailed} changeForm={this.changeForm} onSubmit={this.onSubmitLogin}/>
        } else {
            return <SignUpForm authFailed={this.props.authFailed} changeForm={this.changeForm} onSubmit={this.onSubmitSignUp}/>
        }
    };
    render () {
        return (
            <div>
                { this.renderCorrectPart()  }
            </div>
        );
    };
};
const mapStateToProps = (state) => ({
    user: state.auth,
    authFailed: state.auth.authFailed
});

const mapDispatchToProps = (dispatch) => ({
    startSignUp: (userData) => dispatch(startSignUp(userData)),
    startLogin: (userData) => dispatch(startLogin(userData)),
    startLogout: (userToken) => dispatch(startLogout(userToken)),
    getUser: (userToken) => dispatch(getUser(userToken))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserSection);