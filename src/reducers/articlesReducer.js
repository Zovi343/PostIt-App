
const articlesReducerDefaultState = [];

export default ( state = articlesReducerDefaultState, action) => {
    switch(action.type) {
        case 'SET_ARTICLES':
            return action.articles;
        case 'ADD_ARTICLE':
            return [
                ...state,
                action.article
            ];
        case 'EDIT_ARTICLE':
            return state.map((article) => {
                if (article._id === action.id) {
                    return action.updatedArticle
                } else {
                    return article
                };
            });
        case 'REMOVE_ARTICLE':
            return state.filter((article) => article._id !== action.id);
        case 'COMMENT_ARTICLE':
            return state.map((article) => {
                if (article._id === action.id) {
                    const newArticle = Object.assign({}, article)
                    newArticle.comments.push(action.comment);
                    return newArticle;
                } else {
                    return article
                };
            });
        case 'REMOVE_COMMENT': 
            return state.map((article) => {
                if (article._id === action.id) {
                    const newArticle = Object.assign({}, article)
                    newArticle.comments = article.comments.filter((comment) => comment._id !== action.commentId);
                    return newArticle;
                } else {
                    return article
                };
            });
        case 'ADD_LIKE':
            return state.map((article) => {
                if (article._id === action.id) {
                    const newArticle = Object.assign({}, article)
                    newArticle.likes.push(action.userId);
                    return newArticle;
                } else {
                    return article
                };
            });
        case 'REMOVE_LIKE':
            return state.map((article) => {
                if (article._id === action.id) {
                    const newArticle = Object.assign({}, article);
                    newArticle.likes = article.likes.filter((like) => like !== action.userId);
                    return newArticle;
                } else {
                    return article
                };
            });
        default:
            return state;
    };
};