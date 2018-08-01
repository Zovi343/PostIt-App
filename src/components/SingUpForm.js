import React from 'react';

class SingUpForm extends React.Component {
    state = {
        name: '',
        password: '',
        passwordAgain: '',
        error: ''
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
    onPasswordAgainChange = (e) => {
        const passwordAgain = e.target.value;
        this.setState(() =>({
            passwordAgain
        }));
    };
    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.name.trim().length < 3 || this.state.password.trim().length < 6 ) {
            this.setState(() => ({
                error: 'Your name must contain at least 3 characters and password must contain at least 6'
            }));
        } else if (this.state.password !== this.state.passwordAgain) {
            this.setState(() => ({
                error: 'Passwords do not match!'
            }))
        } else {
            this.props.onSubmit({
                name: this.state.name,
                password: this.state.password
            });
        }
    }
    render () {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input onChange={this.onNameChange} placeholder="Your name" type="text" value={this.state.name} required/>
                    <input onChange={this.onPasswordChange} placeholder="Password" type="text" value={this.state.password} required/>
                    <input onChange={this.onPasswordAgainChange} placeholder="Password Again" type="text" value={this.state.passwordAgain} required/>
                    <input type="submit" value="Sign Up" />
                    { this.state.error && <p>{this.state.error}</p> }
                    { (this.props.authFailed && !this.props.authFailed.login ) && <p>{this.props.authFailed.error}</p> }
                </form>
                <p>OR</p>
                <button onClick={this.props.changeForm}>Login</button>
            </div>
        )
    }
}

export default SingUpForm;