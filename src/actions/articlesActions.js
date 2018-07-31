import uuid from 'uuid';


export const addArticle = (article) => ({
    type: 'ADD_ARTICLE',
    article: {
        id: uuid(),
        likes: [],
        comments: [],
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

export const commentArticle = (id, comment) => ({
    type: 'COMMENT_ARTICLE',
    id,
    comment
});

export const removeComment = (id, commentId) => ({
    type: 'REMOVE_COMMENT',
    id,
    commentId
});

export const addLike = ( id,userId) => ({
    type: 'ADD_LIKE',
    id,
    userId
});

export const removeLike = ( id,userId) => ({
    type: 'REMOVE_LIKE',
    id,
    userId
});