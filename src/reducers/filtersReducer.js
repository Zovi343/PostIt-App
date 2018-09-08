
const filterReducerDefault = {
    yourArticles: false,
    text: ''
};

export default (state = filterReducerDefault, action) => {
    switch (action.type) {
        case 'SET_YOUR_ARTICLES_FILTER':
            return {
                ...state,
                yourArticles: true
            };
        case 'REMOVE_YOUR_ARTICLES_FILTER':
            return {
                ...state,
                yourArticles: false
            };
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            };
        default: 
            return state;
    };
};