import axios from 'axios';
import { setNetworkError } from './articlesActions';

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
            // user id is not stored _id (thah way I store it for articles and comments)
            id: response.data.user._id,
            name: response.data.user.name,
            token: response.headers["x-auth"]
            };

            sessionStorage.setItem('token', newUser.token);
            dispatch(storeUser(newUser))
        } catch (e) {
            console.log('Error in startSignUp:', e);
            if(e.message === 'Network Error'){
                dispatch(setNetworkError());
            }
            //login property here helps me determine on which form I should render error
            dispatch(apiError({error:'User with this name already exists.' ,login: false}));
        }
    };
};

//Loging In
export const startLogin = (userData) => {
    return async (dispatch) => {
       try { 
            const response = await axios.post( '/user/login', {
                "name": userData.name,
                "password": userData.password
            });
            const newUser = {
            id: response.data.user._id,
            name: response.data.user.name,
            token: response.headers["x-auth"]
            };

            sessionStorage.setItem('token', newUser.token);
            dispatch(storeUser(newUser))
        } catch (e) {
            console.log('Error in startLogin:', e);
            if(e.message === 'Network Error'){
                dispatch(setNetworkError());
            }
            //login property here helps me determine on which form I should render error
            dispatch(apiError({error:'Wrong name or password.', login: true}));
        }
    };
};

//get user on page refresh
export const getUser = (userToken) => {
    return async (dispatch) => {
        try { 
             const response = await axios({
                method: 'get',
                url: '/user/me',
                headers: {'x-auth': userToken}
            });
             const newUser = {
             id: response.data.user._id,
             name: response.data.user.name,
             token: userToken
             };
 
             dispatch(storeUser(newUser))
         } catch (e) {
             //login property here helps me determine on which form I should render error
             console.log('Error in getUser:', e);
            if(e.message === 'Network Error'){
                dispatch(setNetworkError());
            }
         }
     };
}

//startLogout
export const startLogout = (userToken) => {
    return async (dispatch) => {
    try {
        const response = await axios({
             method: 'delete',
             url: '/user/logout',
             headers: {'x-auth': userToken}
         });
         sessionStorage.removeItem('token');
         dispatch(removeUser());
    } catch (e) {
        console.log('Error in startLogout:', e);
        if(e.message === 'Network Error'){
            dispatch(setNetworkError());
        }
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

export const removeUser = () => ({
    type: 'REMOVE_USER'
});