import uuid from 'uuid';


export const addArticle = (article) => ({
    type: 'ADD_ARTICLE',
    article: {
        id: uuid(),
        ...article
    }
});

export const editArticle = (id, updates) => ({
    type: 'EDIT_ARTICLE',
    id, 
    updates
});

export const removeArticle = (id) => ({
    type: 'REMOVE_ARTICLE',
    id
}); 