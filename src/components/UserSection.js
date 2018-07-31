import React from 'react';
import { connect } from 'react-redux'
import LogInForm from './LogInForm';
import  SignUpForm from './SingUpForm';
import { startSignUp } from '../actions/auth'

class UserSection extends React.Component {
    state = {
        logIn: false
    }
    onSubmitSignUp = (userData) => {
        this.props.startSignUp(userData);
    }
    render() {
        return (
            <div>
                {  
                    this.state.logIn ? (
                        <LogInForm />
                    ) : (
                        <SignUpForm onSubmit={this.onSubmitSignUp} />
                    )
                }
            </div>
        )
    }
};
const mapStateToProps = (state) => ({
    user: state.auth
});

const mapDispatchToProps = (dispatch) => ({
    startSignUp: (user) => dispatch(startSignUp(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserSection);