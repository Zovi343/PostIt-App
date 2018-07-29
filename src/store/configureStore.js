import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import articlesReducer from '../reducers/articlesReducer'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      articles: articlesReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
