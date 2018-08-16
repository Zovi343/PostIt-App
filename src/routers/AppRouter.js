import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import AddArticle from '../components/AddArticle';
import ArticleList from '../components/ArticleList.js';
import EditArticle from '../components/EditArticle';
import MainPage from '../components/MainPage';
import NotFoundPage from '../components/NotFoundPage';
import ViewArticle from '../components/ViewArticle';
import PrivateRoute from './PrivateRoute';
 
export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div className="container">
    <MainPage />
      <Switch>
        <Route path="/" component={ArticleList} exact={true}/>
        <PrivateRoute path="/create" component={AddArticle} />
        <Route path="/view/:id" component={ViewArticle} />
        <PrivateRoute path="/edit/:id" component={EditArticle} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
