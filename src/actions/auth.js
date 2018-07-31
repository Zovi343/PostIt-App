import axios from 'axios';

export const SignUp = (user) => ({
    type: 'SIGN_UP',
    user
});

export const startSignUp = (userData) => {
    return async (dispatch) => {
        try {
            const response = await axios({
                method: 'post',
                url: 'http://localhost:3000/user',
                data: {
                    "name": userData.name,
                    "password": userData.password
                }
            })
            const newUser = {
            id: response.data.user._id,
            name: response.data.user.name,
            token: response.headers["x-auth"]
            };
            dispatch(SignUp(newUser))
        } catch (e) {
            console.log('Error startSignUp', e);
        }
    };
};
