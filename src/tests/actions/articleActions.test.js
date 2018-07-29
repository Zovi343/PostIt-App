import uuid from 'uuid'
import { addArticle, editArticle, removeArticle } from '../../actions/articlesActions';

test('should create addArticle action object', () => {
    const article = {
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
    const id = uuid();
    const action = editArticle(id, article);
    expect(action).toEqual({
        type: 'EDIT_ARTICLE',
        id,
        updates: article
    });
});


test('should create removeArticle action object', () => {
    const id = uuid();
    const action = removeArticle(id)
    expect(action).toEqual({
        type: 'REMOVE_ARTICLE',
        id,
    });
});
