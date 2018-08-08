import React from 'react';

class LoginForm extends React.Component {
    state = {
        name: '',
        password: ''
    };
    onNameChange = (e) => {
        const name = e.target.value;
        this.setState(() =>({
            name
        }));
    };
    onPasswordChange = (e) => {
        const password = e.target.value;
        this.setState(() =>({
            password
        }));
    };
    onSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit({
            name: this.state.name,
            password: this.state.password
        });
    }
    render () {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input onChange={this.onNameChange} placeholder="Your name" type="text" value={this.state.name} required/>
                    <input onChange={this.onPasswordChange} placeholder="Password" type="password" value={this.state.password} required/>
                    <input type="submit" value="Login" />
                    {/*This checks if the error with authentication exists and if it occured on this form*/}
                    { (this.props.authFailed && this.props.authFailed.login )&& <p>{this.props.authFailed.error}</p> }
                </form>
                <p>OR</p>
                <button onClick={this.props.changeForm}>Sign Up!</button>
            </div>
        );
    };
};

export default LoginForm;