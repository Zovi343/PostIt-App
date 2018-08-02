import uuid from 'uuid';
import axios from 'axios';
import ArticleForm from '../components/ArticleForm';

axios.defaults.baseURL = 'http://localhost:3000';

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
        console.log(response);
        dispatch(addArticle(response.data.article));

    };
};

export const addArticle = (article) => ({
    type: 'ADD_ARTICLE',
    article
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