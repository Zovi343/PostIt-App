import filtersReducer from '../../reducers/filtersReducer';

test('should set default state', () => {
    const state = filtersReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual(null);
});

test('should handle SET_YOUR_ARTICLES_FILTER', () => {
    const state = filtersReducer(undefined, {type: 'SET_YOUR_ARTICLES_FILTER'});
    expect(state).toEqual(true);
});

test('should handle REMOVE_YOUR_ARTICLES_FILTER', () => {
    const state = filtersReducer(true, {type: 'REMOVE_YOUR_ARTICLES_FILTER'});
    expect(state).toEqual(false);
});