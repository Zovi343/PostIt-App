
const articlesReducerDefaultState = [];

export default ( state = articlesReducerDefaultState, action) => {
    switch(action.type) {
        case 'ADD_ARTICLE':
            return [
                ...state,
                action.article
            ];
        case 'EDIT_ARTICLE':
            return state.map((article) => {
                if (article.id === action.id) {
                    return {
                        ...article,
                        ...action.updates
                    }
                } else {
                    return article
                }
            });
        default:
            return state;
    }
};