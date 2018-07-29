import moment from 'moment';
import articles from '../fixtures/articlesFixtures';
import articlesReducer from '../../reducers/articlesReducer';

test('should set default state', () => {
    const state = articlesReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual([]);
});

test('should handle ADD_ARTICLE action', () => {
    const action = {
        type: 'ADD_ARTICLE',
        article: articles[1]
    }
    const state = articlesReducer([articles[0]], action);
    expect(state.length).toBe(2);
}); 

test('should handle EDIT_ARTICLE action', () => {
    const action = {
        type: 'EDIT_ARTICLE',
        id: articles[0].id,
        updates: {
            title: 'Updated!'
        }
    }
    const state = articlesReducer(articles, action);
    expect(state[0].title).toBe(action.updates.title);
});

test('should handle REMOVE_ARTICLE', () => {
    const action = {
        type: 'REMOVE_ARTICLE',
        id: articles[0].id,
    }
    const state = articlesReducer(articles, action);
    expect(state.length).toBe(2);
}); 