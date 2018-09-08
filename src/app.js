import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { getUser } from './actions/authActions';
import { startSetArticles } from './actions/articlesActions';
import LoadingPage from './components/LoadingPage'


const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    store.dispatch(startSetArticles()).then(() => {
      ReactDOM.render(jsx, document.getElementById('app'));
    });
    hasRendered = true;
  }
};

const userToken = sessionStorage.getItem('token');

if(userToken) {
  store.dispatch(getUser(userToken)).then(() => {
    renderApp();
  });
} else {
  renderApp();
};
