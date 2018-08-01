import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

//Signing Up
export const startSignUp = (userData) => {
    return async (dispatch) => {
        try {
            const response = await axios.post( '/user', {
                "name": userData.name,
                "password": userData.password
            });
            const newUser = {
            id: response.data.user._id,
            name: response.data.user.name,
            token: response.headers["x-auth"]
            };
            dispatch(storeUser(newUser))
        } catch (e) {
            console.log('Error startSignUp', e);
        }
    };
};

//Loging In
export const startLogin = (userData) => {
    return async (dispatch) => {
        const response = await axios.post( '/user/login', {
            "name": userData.name,
            "password": userData.password
        });
        const newUser = {
        id: response.data.user._id,
        name: response.data.user.name,
        token: response.headers["x-auth"]
        };
        dispatch(storeUser(newUser))
    }
}

//Storing User afer startSignUp or startLogin
export const storeUser = (user) => ({
    type: 'STORE_USER',
    user
});

//startLogout
export const startLogout = (userToken) => {
    return async (dispatch) => {
       const response = await axios({
            method: 'delete',
            url: '/user/logout',
            headers: {'x-auth': userToken}
        });
        console.log(response.status);
        dispatch(removeUser())
    }
}

export const removeUser = () => ({
    type: 'REMOVE_USER'
})