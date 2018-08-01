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
            //login property here helps me determine on which form I should render error
            dispatch(apiError({error:'User with this name already exists.' ,login: false}))
        }
    };
};

//Loging In
export const startLogin = (userData) => {
    return async (dispatch) => {
       try { const response = await axios.post( '/user/login', {
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
            //login property here helps me determine on which form I should render error
            dispatch(apiError({error:'Wrong name or password.', login: true}))
        }
    };
};

//Storing User afer startSignUp or startLogin
export const storeUser = (user) => ({
    type: 'STORE_USER',
    user
});

//Handling 400 bad request sent back from server when wrong data is passed in
export const apiError = (error) => ({
    type: 'API_ERROR',
    error
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
    };
};

export const removeUser = () => ({
    type: 'REMOVE_USER'
});