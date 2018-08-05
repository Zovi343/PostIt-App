
export default (state = null, action) => {
    switch (action.type) {
        case 'SET_YOUR_ARTICLES_FILTER':
            return true;
        case 'REMOVE_YOUR_ARTICLES_FILTER':
            return false;
        default: 
            return state;
    }
}