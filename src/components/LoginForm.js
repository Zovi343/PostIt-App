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
            <div className="not-logged-in">
                <form className="not-logged-in__group form" onSubmit={this.onSubmit}>
                    <div className="form__group">
                        <label htmlFor="name">Name</label>
                        <input className="form__input" id="name" onChange={this.onNameChange} placeholder="Your name" type="text" value={this.state.name} required/>
                    </div>
                    <div className="form__group u-margin-bottom-large">
                        <label htmlFor="password">Password</label>
                        <input className="form__input" id="password" onChange={this.onPasswordChange} placeholder="Password" type="password" value={this.state.password} required/>
                    </div>
                    <input className="btn btn--white" type="submit" value="Login" />
                </form>
                <p className="not-logged-in__group" >OR</p>
                <button className="not-logged-in__group btn btn--green" onClick={this.props.changeForm}>Sign Up!</button>
                {/*This checks if the error with authentication exists and if it occured on this form*/}
                { (this.props.authFailed && this.props.authFailed.login ) && <p>{this.props.authFailed.error}</p> }
            </div>
        );
    };
};

export default LoginForm;