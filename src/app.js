import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { addArticle, commentArticle } from './actions/articlesActions';
import moment from 'moment';

const store = configureStore();

const articles = [{
  id: '1',
  createdAt: moment(0).format('D. M. Y'),
  title: 'Breaking news',
  text: 'Political info'
},{
  createdAt: moment(0).subtract(4, 'days').format('D. M. Y'),
  title: 'New graphene chips ?',
  text: 'Are going to conqver world'
},{
  createdAt: moment(0).add(4, 'days').format('D. M. Y'),
  title: 'New hydrogen revolution?',
  text: 'Hydrogen powered ship is going to sail'
}
];

const comment = {
  id: 2,
  comment: 'jahoda',
  createdAt: 0
}

store.dispatch(addArticle(articles[0]));
store.dispatch(addArticle(articles[1]));
store.dispatch(commentArticle(articles[0].id, comment));

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));

