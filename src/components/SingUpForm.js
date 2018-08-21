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
        if(this.state.error) { //<-- this is not tested (I added this in order to make errors work)
            this.setState(() => ({
                error: ''
            }));
        }

        if (this.state.name.trim().length < 3 || this.state.password.trim().length < 6 ) {
            this.setState(() => ({
                error: 'Your name must contain at least 3 characters and password must contain at least 6 characters.'
            }));
        } else if (this.state.name.trim().length > 10) {
            this.setState(() => ({
                error: 'Your name can contain only up to 10 characters.'
            }))
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
            <div className="not-logged-in">
                <form className="not-logged-in__group form" onSubmit={this.onSubmit}>
                    <div className="form__group">
                        <label htmlFor="name">Name</label>
                        <input className="form__input" id="name" onChange={this.onNameChange} placeholder="Your name" type="text" value={this.state.name} required/>
                    </div>
                    <div className="form__group">
                        <label htmlFor="password">Password</label>
                        <input className="form__input" id="password" onChange={this.onPasswordChange} placeholder="Password" type="password" value={this.state.password} required/>
                    </div>
                    <div className="form__group u-margin-bottom-large">
                        <label htmlFor="password">Repeat Password</label>
                        <input  className="form__input" onChange={this.onPasswordAgainChange} placeholder="Repeat Password" type="password" value={this.state.passwordAgain} required/>
                    </div>
                    <input className="btn btn--green" type="submit" value="Sign Up" />
                </form>
                <p className="not-logged-in__group" >OR</p>
                <button className="not-logged-in__group btn btn--white" onClick={this.props.changeForm}>Log In</button>
                { 
                this.state.error
                    ? <p className="auth-error">{this.state.error}</p>
                    :  this.props.authFailed && !this.props.authFailed.login
                        ? <p className="auth-error">{this.props.authFailed.error}</p>
                        : <p></p>
                }
            </div>
        )
    }
}

export default SingUpForm;