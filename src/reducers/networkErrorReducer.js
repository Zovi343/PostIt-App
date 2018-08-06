

export default (state = false, action) => {
    switch(action.type) {
        case 'NETWORK_ERROR':
            return true;
        default: 
            return state;
    };
};