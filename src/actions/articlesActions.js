import uuid from 'uuid';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

export const startSetArticles = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get('/articles');
            dispatch(setArticles(response.data.allArticles));
            
        } catch (e) {
            console.log('Error startSetArticles', e);
        }
    };
};

export const startAddArticle = (article) => {
    return async (dispatch, getState) => {
        const userToken = getState().auth.token
        const response = await axios({
            method: 'post',
            url: '/article', 
            data: {
                "createdAt": article.createdAt,
                "text": article.text,
                "title": article.title
            },
            headers: {'x-auth': userToken}
        });

        dispatch(addArticle(response.data.article));

    };
};

export const startEditArticle = (articleId, article) => {
    return async (dispatch, getState) => {
        const userToken = getState().auth.token
        const response = await axios({
            method: 'patch',
            url: `/article/${articleId}`, 
            data: {
                "text": article.text,
                "title": article.title
            },
            headers: {'x-auth': userToken}
        });
        dispatch(editArticle(articleId, response.data.updatedArticle));

    };
};


export const setArticles = (articles) => ({
    type: 'SET_ARTICLES',
    articles
});

export const addArticle = (article) => ({
    type: 'ADD_ARTICLE',
    article
});

export const editArticle = (id, updatedArticle) => ({
    type: 'EDIT_ARTICLE',
    id, 
    updatedArticle
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