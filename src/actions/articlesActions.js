import axios from 'axios';

if (process.env.NODE_ENV === 'production') {
    axios.defaults.baseURL= 'https://sleepy-shelf-83196.herokuapp.com'
} else {
    axios.defaults.baseURL = 'http://localhost:3000';
}

export const startSetArticles = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get('/articles');
            dispatch(setArticles(response.data.allArticles));
            
        } catch (e) {
            if(e.message === 'Network Error'){
                dispatch(setNetworkError());
            } else {
                // it is here in else because I am testing this in test case, so in order to stop it from print out in terminal every single time I run test I put it in else statement, I am not going to test other thats why they are not in else
                console.log('Error in startSetArticles:', e); 
            }
        }
    };
};

// this action is called right above in the case that server is down it is handled by networkErrorReducer and also store in store in field networkError
export const setNetworkError = () => ({
    type: 'NETWORK_ERROR'
})

export const startAddArticle = (article) => {
    return async (dispatch, getState) => {
       try {
            const userToken = getState().auth.token
            const response = await axios.post('/article',{
                    "createdAt": article.createdAt,
                    "text": article.text,
                    "title": article.title
                },{
                headers: {'x-auth': userToken}
                }
            );

            dispatch(addArticle(response.data.article));
        } catch (e) {
            console.log('Error in startAddArticle:', e);
            if(e.message === 'Network Error'){
                dispatch(setNetworkError());
            }
        }
    };
};

export const startEditArticle = (articleId, article) => {
    return async (dispatch, getState) => {
       try {
            const userToken = getState().auth.token
            const response = await axios.patch(`/article/${articleId}`,{
                    "text": article.text,
                    "title": article.title,
                    "editedAt": article.createdAt //it's called createdAt but it represents time when it was updated, the name is createdAt because I use same form for creating and updating article
                },{
                headers: {'x-auth': userToken}
                }
            );
            dispatch(editArticle(articleId, response.data.updatedArticle));
        } catch (e) {
            console.log('Error in startEditArticle:', e);
            if(e.message === 'Network Error'){
                dispatch(setNetworkError());
            }
        }
    };
};

export const startRemoveArticle = (articleId) => {
    return async (dispatch, getState) => {
        try {
            const userToken = getState().auth.token;
            const response = await axios.delete(`/article/${articleId}`,{
                headers: {'x-auth': userToken}
                }
            );
            dispatch(removeArticle(response.data.removedArticle._id));
        } catch (e) {
            console.log('Error in startRemoveArticle', e);
            if(e.message === 'Network Error'){
                dispatch(setNetworkError());
            }
        }
    };
};

export const startCommentArticle = (articleId, comment) => {
    return async (dispatch, getState) => {
        try {
            const userToken = getState().auth.token;
            const response = await axios.post(`/article/${articleId}/comment`,{
                    text: comment.comment,
                    createdAt: comment.createdAt
                },{
                headers: {'x-auth': userToken}
                }
            );
            dispatch(commentArticle(articleId, response.data.comment));
        } catch (e) {
            console.log('Error in startCommentArticle', e);
            if(e.message === 'Network Error'){
                dispatch(setNetworkError());
            }
        }
    };
}

export const startRemoveComment = (articleId, commentId) => {
    return async (dispatch, getState) => {
        try {
            const userToken = getState().auth.token;
            const response = await axios.delete(`/article/${articleId}/comment/${commentId}`,{
                headers: {'x-auth': userToken}
            });
            dispatch(removeComment(articleId, commentId));
        } catch (e) {
            console.log('Error in startRemoveComment', e);
            if(e.message === 'Network Error'){
                dispatch(setNetworkError());
            }
        }
    };
};

export const startAddLike = (articleId ,userId) => {
    return async (dispatch, getState) => {
        try {
            const userToken = getState().auth.token;
            await axios.post(`/article/${articleId}/like`,{},{
                headers: {'x-auth': userToken}
            });
            dispatch(addLike( articleId, userId));
        } catch (e) {
            console.log('Error in startAddLike', e);
            if(e.message === 'Network Error'){
                dispatch(setNetworkError());
            }
        }
    };
};

export const startRemoveLike = (articleId ,userId) => {
    return async (dispatch, getState) => {
        try {
            const userToken = getState().auth.token;
            await axios.delete(`/article/${articleId}/like` ,{
                headers: {'x-auth': userToken}
            });
            dispatch(removeLike( articleId, userId));
        } catch (e) {
            console.log('Error in startRemoveLike', e);
            if(e.message === 'Network Error'){
                dispatch(setNetworkError());
            }
        }
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