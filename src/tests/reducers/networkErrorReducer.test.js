import networkErrorReducer from '../../reducers/networkErrorReducer';

test('should set default state', () => {
    const state = networkErrorReducer (undefined, {type: '@@INIT'});
    expect(state).toEqual(false);
});

test('should set default state', () => {
    const state = networkErrorReducer (undefined, {type: 'NETWORK_ERROR'});
    expect(state).toEqual(true);
});