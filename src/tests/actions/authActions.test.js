import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import {
    startSignUp,
    startLogin,
    startLogout,
    getUser,
    storeUser,
    removeUser,
    apiError,
} from '../../actions/authActions';
import articles from '../fixtures/articlesFixtures';
import user from '../fixtures/usersFixtures';


const createMockStore = configureStore([thunk]);
const defaultState = { auth: { token: user.token}};

beforeEach(() => {
    // this allows me to mock out session storage
    global.sessionStorage = jest.genMockFunction();
    global.sessionStorage.setItem = jest.genMockFunction();
    global.sessionStorage.removeItem = jest.genMockFunction();
})

test('startSignUp should call axios and dispatch storeUser', async () => {
    const store = createMockStore();
    axios.post.mockImplementationOnce(() => 
    Promise.resolve({
        data: {
            user: { _id: user.id, name: user.name},
        },
        headers: {
            'x-auth': user.token
        }
    })
    );
    const userWithPassword = {password: '123', ...user}
    await store.dispatch(startSignUp(userWithPassword));
    expect(axios.post).toHaveBeenLastCalledWith('/user',{
        "name": userWithPassword.name,
        "password": userWithPassword.password
    });
    expect(sessionStorage.setItem).toHaveBeenLastCalledWith('token', user.token);
    const actions = store.getActions();
    expect(actions[0]).toEqual(storeUser(user));
});

test('startLogin should call axios and dispatch storeUser', async () => {
    const store = createMockStore();
    axios.post.mockImplementationOnce(() => 
    Promise.resolve({
        data: {
            user: { _id: user.id, name: user.name},
        },
        headers: {
            'x-auth': user.token
        }
    })
    );
    const userWithPassword = {password: '123', ...user}
    await store.dispatch(startLogin(userWithPassword));
    expect(axios.post).toHaveBeenLastCalledWith('/user/login',{
        "name": userWithPassword.name,
        "password": userWithPassword.password
    });
    expect(sessionStorage.setItem).toHaveBeenLastCalledWith('token', user.token);
    const actions = store.getActions();
    expect(actions[0]).toEqual(storeUser(user));
});

test('getUser should call axios and dispatch storeUser', async () => {
    const store = createMockStore();
    axios.get.mockImplementationOnce(() => 
    Promise.resolve({
        data: {
            user: { _id: user.id, name: user.name},
        },
        headers: {
            'x-auth': user.token
        }
    })
    );
    await store.dispatch(getUser(user.token));
    expect(axios.get).toHaveBeenLastCalledWith('/user/me',{
        headers: {'x-auth': user.token}
    });
    const actions = store.getActions();
    expect(actions[0]).toEqual(storeUser(user));
});

test('startLogout should call axios and dispatch removeUser', async () => {
    const store = createMockStore();
    axios.delete.mockImplementationOnce(() => 
    Promise.resolve({
        data: {}
    })
    );
    await store.dispatch(startLogout(user.token));
    expect(axios.delete).toHaveBeenLastCalledWith('/user/logout',{
        headers: {'x-auth': user.token}
    });
    expect(sessionStorage.removeItem).toHaveBeenLastCalledWith('token');
    const actions = store.getActions();
    expect(actions[0]).toEqual(removeUser());
});

test('storeUser should create correct action object', () => {
    const action = storeUser(user);
    expect(action).toEqual({
        type: 'STORE_USER',
        user
    });
});

test('apiError should create correct action object', () => {
    const error = new Error('testing error');
    const action = apiError(error);
    expect(action).toEqual({
        type: 'API_ERROR',
        error
    });
});

test('removeUser should create correct action object', () => {
    const action = removeUser();
    expect(action).toEqual({
        type: 'REMOVE_USER'
    });
});
