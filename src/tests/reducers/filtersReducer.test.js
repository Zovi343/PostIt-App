import filtersReducer from '../../reducers/filtersReducer';

test('should set default state', () => {
    const state = filtersReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual({yourArticles: false, text: ''});
});

test('should handle SET_YOUR_ARTICLES_FILTER', () => {
    const state = filtersReducer(undefined, {type: 'SET_YOUR_ARTICLES_FILTER'});
    expect(state).toEqual({yourArticles: true, text: ''});
});

test('should handle REMOVE_YOUR_ARTICLES_FILTER', () => {
    const state = filtersReducer({yourArticles: true, text: ''}, {type: 'REMOVE_YOUR_ARTICLES_FILTER'});
    expect(state).toEqual({yourArticles: false, text: ''});
});