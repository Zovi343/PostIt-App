import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import { 
        addArticle, 
        addLike, 
        commentArticle, 
        editArticle, 
        removeArticle, 
        removeComment, 
        removeLike, 
        setNetworkError, 
        setArticles,
        startSetArticles,
        startAddArticle,
        startEditArticle,
        startRemoveArticle,
        startCommentArticle,
        startRemoveComment,
        startAddLike,
        startRemoveLike
} from '../../actions/articlesActions';
import articles from '../fixtures/articlesFixtures';
import user from '../fixtures/usersFixtures';


const createMockStore = configureStore([thunk]);
const defaultState = { auth: { token: user.token}};

test('startSetArticle make axios.get request and dispatch setArticles action', async () => {
    const store = createMockStore({});
    axios.get.mockImplementationOnce(() => 
    Promise.resolve({
        data: {
            sortedArticles: articles
        }
    })
    );
    await store.dispatch(startSetArticles());
    expect(axios.get).toHaveBeenCalledTimes(1);
    const actions = store.getActions();
    expect(actions[0]).toEqual(setArticles(articles));

});

//I am going to test this edge only this time I think there is no point in testin it in other async actions
test('startSetArticles should dispatch setNetworkError if server is down',async () => {
    const store = createMockStore({});
    axios.get.mockImplementationOnce(() => 
    Promise.reject(new Error('Network Error'))
    );
    await store.dispatch(startSetArticles());
    expect(axios.get).toHaveBeenCalledTimes(2);
    const actions = store.getActions();
    expect(actions[0]).toEqual(setNetworkError());

});

test('startAddArticle should call axios and dispatch addArticle action', async () => {
    const store = createMockStore(defaultState);
    axios.post.mockImplementationOnce(() => 
    Promise.resolve({
        data: {
            article: articles[0]
        }
    })
    );
    await store.dispatch(startAddArticle(articles[0]));
    expect(axios.post).toHaveBeenLastCalledWith('/article',{
        "createdAt": articles[0].createdAt,
        "text": articles[0].text,
        "title": articles[0].title
    },{
    headers: {'x-auth': defaultState.auth.token}
    });
    const actions = store.getActions();
    expect(actions[0]).toEqual(addArticle(articles[0]))
});

test('startEditArticle should call axios and dispatch editArticle action', async () => {
    const store = createMockStore(defaultState);
    axios.patch.mockImplementationOnce(() => 
    Promise.resolve({
        data: {
            updatedArticle: articles[0]
        }
    })
    );
    await store.dispatch(startEditArticle(articles[0]._id ,articles[0]));
    expect(axios.patch).toHaveBeenLastCalledWith(`/article/${articles[0]._id}`,{
        "text": articles[0].text,
        "title": articles[0].title,
        "editedAt": articles[0].createdAt
    },{
    headers: {'x-auth': defaultState.auth.token}
    });
    const actions = store.getActions();
    expect(actions[0]).toEqual(editArticle(articles[0]._id, articles[0]))
});

test('startRemoveArticle should call axios and dispatch removeArticle action', async () => {
    const store = createMockStore(defaultState);
    axios.delete.mockImplementationOnce(() => 
    Promise.resolve({
        data: {
            removedArticle: { _id: articles[0]._id }
        }
    })
    );
    await store.dispatch(startRemoveArticle(articles[0]._id));
    expect(axios.delete).toHaveBeenLastCalledWith(`/article/${articles[0]._id}`,{
        headers: {'x-auth': defaultState.auth.token}
    });
    const actions = store.getActions();
    expect(actions[0]).toEqual(removeArticle(articles[0]._id))
});

test('startCommentArticle should call axios and dispatch commentArticle action', async () => {
    const store = createMockStore(defaultState);
    axios.post.mockImplementationOnce(() => 
    Promise.resolve({
        data: {
            comment: articles[0].comments[0]
        }
    })
    );
    await store.dispatch(startCommentArticle(articles[0]._id, articles[0].comments[0]));
    expect(axios.post).toHaveBeenLastCalledWith(`/article/${articles[0]._id}/comment`,{
        "text": articles[0].comments[0].comment,
        "createdAt": articles[0].comments[0].createdAt
    },{
    headers: {'x-auth': defaultState.auth.token}
    });
    const actions = store.getActions();
    expect(actions[0]).toEqual(commentArticle(articles[0]._id, articles[0].comments[0]))
});

test('startRemoveComment should call axios and dispatch removeComment action', async () => {
    const store = createMockStore(defaultState);
    axios.delete.mockImplementationOnce(() => 
    Promise.resolve({
        data: {}
    })
    );
    await store.dispatch(startRemoveComment(articles[0]._id, articles[0].comments[0]._id));
    expect(axios.delete).toHaveBeenLastCalledWith(`/article/${articles[0]._id}/comment/${articles[0].comments[0]._id}`,{
        headers: {'x-auth': defaultState.auth.token}
    });
    const actions = store.getActions();
    expect(actions[0]).toEqual(removeComment(articles[0]._id, articles[0].comments[0]._id))
});

test('startAddLike should call axios and dispatch addLike action', async () => {
    const store = createMockStore(defaultState);
    axios.post.mockImplementationOnce(() => 
    Promise.resolve({
        data: {}
    })
    );
    await store.dispatch(startAddLike(articles[0]._id, user.id));
    expect(axios.post).toHaveBeenLastCalledWith(`/article/${articles[0]._id}/like`,{},{
    headers: {'x-auth': defaultState.auth.token}
    });
    const actions = store.getActions();
    expect(actions[0]).toEqual(addLike(articles[0]._id, user.id))
});

test('startRemoveLike should call axios and dispatch removeLike action', async () => {
    const store = createMockStore(defaultState);
    axios.delete.mockImplementationOnce(() => 
    Promise.resolve({
        data: {}
    })
    );
    await store.dispatch(startRemoveLike(articles[0]._id, user.id));
    expect(axios.delete).toHaveBeenLastCalledWith(`/article/${articles[0]._id}/like`,{
    headers: {'x-auth': defaultState.auth.token}
    });
    const actions = store.getActions();
    expect(actions[0]).toEqual(removeLike(articles[0]._id, user.id))
});

test('should create setNetworkError action object', () => {
    const action = setNetworkError();
    expect(action).toEqual({ type: 'NETWORK_ERROR' })
});

test('should create setArticles action object', () => {
    const action = setArticles(articles);
    expect(action).toEqual({type: 'SET_ARTICLES', articles})
});

test('should create addArticle action object', () => {
    const article = {
        id: 'jndakjwDEF',
        likes: [],
        comments: [],
        title: 'test',
        text: 'some text for test',
        createdAt: '2.7.2018'
    };
    const action = addArticle(article);
    expect(action).toEqual({
        type: 'ADD_ARTICLE',
        article: {
        id: expect.any(String),
        ...article
        }
    });
});

test('should create setNetworkError action', () => {
    const action = setNetworkError();
    expect(action).toEqual({ type: 'NETWORK_ERROR' })
});


test('should create editArticle action object', () => {
    const article = {
        title: 'updated!',
        text: 'some text for update',
        createdAt: '2.7.2018'
    };
    const id = '123abc'
    const action = editArticle(id, article);
    expect(action).toEqual({
        type: 'EDIT_ARTICLE',
        id,
        updatedArticle: article
    });
});


test('should create removeArticle action object', () => {
    const id = '123abc'
    const action = removeArticle(id)
    expect(action).toEqual({
        type: 'REMOVE_ARTICLE',
        id,
    });
});

test('should create commentArticle action object', () => {
    const id = '123abc';
    const comment = {
        comment: 'Some text',
        createdAt: '2.7.2018',
        id: '64dsa6d'
    }
    const action = commentArticle(id, comment);
    expect(action).toEqual({
        type: 'COMMENT_ARTICLE',
        id,
        comment
    });
});

test('should create removeComment action object', () => {
    const id = '123abc';
    const commentId = '9876';
    const action = removeComment(id, commentId);
    expect(action).toEqual({
        type: 'REMOVE_COMMENT',
        id,
        commentId
    });
});

test('should create addLike action object', () => {
    const id = '123abc';
    const userId = 'someId';
    const action = addLike(id, userId);
    expect(action).toEqual({
        type: 'ADD_LIKE',
        id, 
        userId
    });
});

test('should create removeLike action object', () => {
    const id = '123abc';
    const userId = 'someId';
    const action = removeLike(id, userId);
    expect(action).toEqual({
        type: 'REMOVE_LIKE',
        id, 
        userId
    });
});