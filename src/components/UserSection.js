import React from 'react';
import { connect } from 'react-redux'
import LoginForm from './LoginForm';
import  SignUpForm from './SingUpForm';
import LoggedIn from './LoggedIn';
import { history } from '../routers/AppRouter';
import { startSignUp, startLogin, startLogout, storeUser } from '../actions/authActions';

export class UserSection extends React.Component {
    state = {
        //this determines on which form I am currently
        login: true
    };
    changeForm = () => {
        this.state.login ? this.setState(() => ({ login: false})) : this.setState(() => ({ login: true}));
        this.props.storeUser({}); // <-- there is not test case for this!!!
    };
    onCreateArticle = () => {
        history.push('/create');
    };
    onLogout = () => {
        //this here ensures that user gets always redirected to the login section when logout(and not to the signup section)
        this.setState(() => ({
            login: true
        }));
        this.props.startLogout(this.props.user.token);
        //this  redirects the user in case he logs out while creating or edititng article
        if(window.location.href.includes('edit') || window.location.href.includes('create')){
            history.push('/');
        };
    };
    onSubmitLogin = (userData) => {
        this.props.startLogin(userData)
    };
    onSubmitSignUp = (userData) => {
        this.props.startSignUp(userData);
    };
    renderCorrectPart = () => {
        // this checks if user exists(I need to chcek if property name exists because on state.auth are stored also errors which might occur with authtentication)
        if(!!this.props.user.name) {
            return <LoggedIn onCreateArticle={this.onCreateArticle} name={this.props.user.name} onLogout={this.onLogout} />
        } else if (this.state.login) {
            return <LoginForm authFailed={this.props.authFailed} changeForm={this.changeForm} onSubmit={this.onSubmitLogin} />
        } else {
            return <SignUpForm authFailed={this.props.authFailed} changeForm={this.changeForm} onSubmit={this.onSubmitSignUp} />
        }
    };
    render () {
        return (
            <div className="sidebar">
                { 
                this.renderCorrectPart()
                }
                <footer className="legal">This page was created and designed by Jakub Žovák.</footer>
            </div>
        );
    };
};
const mapStateToProps = (state) => ({
    user: state.auth,
    authFailed: state.auth.authFailed,
    networkError: state.networkError
});

const mapDispatchToProps = (dispatch) => ({
    startSignUp: (userData) => dispatch(startSignUp(userData)),
    startLogin: (userData) => dispatch(startLogin(userData)),
    startLogout: (userToken) => dispatch(startLogout(userToken)),
    storeUser: (data) => dispatch(storeUser(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserSection);