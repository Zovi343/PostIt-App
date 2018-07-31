import { addArticle, addLike, commentArticle, editArticle, removeArticle, removeComment, removeLike } from '../../actions/articlesActions';

test('should create addArticle action object', () => {
    const article = {
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
        updates: article
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
    })
});

test('should create removeLike action object', () => {
    const id = '123abc';
    const userId = 'someId';
    const action = removeLike(id, userId);
    expect(action).toEqual({
        type: 'REMOVE_LIKE',
        id, 
        userId
    })
});