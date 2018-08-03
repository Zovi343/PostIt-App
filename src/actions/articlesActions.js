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
       try {
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
        } catch (e) {
            console.log('Error in startAddArticle:', e)
        }
    };
};

export const startEditArticle = (articleId, article) => {
    return async (dispatch, getState) => {
       try {
            const userToken = getState().auth.token
            const response = await axios({
                method: 'patch',
                url: `/article/${articleId}`, 
                data: {
                    "text": article.text,
                    "title": article.title,
                    "editedAt": article.createdAt //it's called createdAt but it represents time when it was updated, the name is createdAt because I use same form for creating and updating article
                },
                headers: {'x-auth': userToken}
            });
            dispatch(editArticle(articleId, response.data.updatedArticle));
        } catch (e) {
            console.log('Error in startEditArticle:', e);
        }
    };
};

export const startRemoveArticle = (articleId) => {
    return async (dispatch, getState) => {
        try {
            const userToken = getState().auth.token;
            const response = await axios({
                method: 'delete',
                url: `/article/${articleId}`,
                headers: {'x-auth': userToken}

            });
            dispatch(removeArticle(response.data.removedArticle._id));
        } catch (e) {
            console.log('Error in startRemoveArticle', e);
        }
    };
};

export const startCommentArticle = (articleId, comment) => {
    return async (dispatch, getState) => {
        try {
            const userToken = getState().auth.token;
            const response = await axios({
                method: 'post',
                url: `/article/${articleId}/comment`,
                data: {
                    text: comment.comment,
                    createdAt: comment.createdAt
                },
                headers: {'x-auth': userToken}

            });
            console.log(response);
            dispatch(commentArticle(articleId, response.data.comment));
        } catch (e) {
            console.log('Error in startCommentArticle', e);
        }
    };
}

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