import authReducer from '../../reducers/authReducer';
import user from '../fixtures/usersFixtures';

test('should set default state', () => {
    const state = authReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual({});
});

test('should handle STORE_USER action ', () => {
    const state = authReducer(undefined, {type: 'STORE_USER', user});
    expect(state).toEqual({...user});
});

test('should handle REMOVE_USER action ', () => {
    const state = authReducer({...user}, {type: 'REMOVE_USER'});
    expect(state).toEqual({});
});

test('should handle REMOVE_USER action ', () => {
    const error = {error:'Wrong name or password.', login: true};
    const state = authReducer(undefined, {type: 'API_ERROR', error });
    expect(state).toEqual({ authFailed: error});
});
