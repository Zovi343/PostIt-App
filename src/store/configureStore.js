import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import articlesReducer from '../reducers/articlesReducer';
import authReducer from '../reducers/authReducer';
import filtersReducer from '../reducers/filtersReducer';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      articles: articlesReducer,
      auth: authReducer,
      filter: filtersReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
