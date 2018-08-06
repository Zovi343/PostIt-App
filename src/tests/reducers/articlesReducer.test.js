import articlesReducer from '../../reducers/articlesReducer';
import articles from '../fixtures/articlesFixtures';

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
        id: articles[0]._id,
        updatedArticle: {
            title: 'Updated!',
        },
    }
    const state = articlesReducer(articles, action);
    expect(state[0].title).toBe(action.updatedArticle.title);
});

test('should handle REMOVE_ARTICLE action', () => {
    const action = {
        type: 'REMOVE_ARTICLE',
        id: articles[0]._id,
    }
    const state = articlesReducer(articles, action);
    expect(state.length).toBe(2);
}); 

test('should handle COMMENT_ARTICLE action', () => {
    const action = {
        type: 'COMMENT_ARTICLE',
        id: articles[2]._id,
        comment: {
            comment: 'Test comment',
            createdAt: '2.7.2018',
            id: '2a'
        }
    }
    const state = articlesReducer(articles, action);
    expect(state[2].comments[0]).toEqual(action.comment)
});

test('should handle REMOVE_COMMENT action', () => {
    const action = {
        type: 'REMOVE_COMMENT',
        id: '1',
        commentId: '1a'
    };
    const state = articlesReducer(articles, action);
    expect(state[0].comments.length).toBe(0);
});

test('should handle ADD_LIKE action', () => {
    const action = {
        type: 'ADD_LIKE',
        id: articles[2]._id,
        userId: 'someId'
    }
    const state = articlesReducer(articles, action);
    expect(state[2].likes.length).toBe(1);
});


test('should handle REMOVE_LIKE action', () => {
    const action = {
        type: 'REMOVE_LIKE',
        id: articles[0]._id,
        userId: articles[0].likes[0]
    }
    const state = articlesReducer(articles, action);
    expect(state[0].likes.length).toBe(0);
});



