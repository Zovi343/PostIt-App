
export default (state = {}, action) => {
    switch(action.type) {
        case 'STORE_USER':
            return action.user;
        case 'REMOVE_USER':
            return {};
        case 'API_ERROR':
            return { authFailed: action.error}
        default:
            return state;
    }
}