import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import AddArticle from '../components/AddArticle';
import ArticleList from '../components/ArticleList.js';
import EditArticle from '../components/EditArticle';
import Header from '../components/Header';
import UserSection from '../components/UserSection';
import NotFoundPage from '../components/NotFoundPage';
import ViewArticle from '../components/ViewArticle';
import PrivateRoute from './PrivateRoute';
 
export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div className="container">
      <Header />
      <div className="content">
        <UserSection />
        <Switch>
          <Route path="/" component={ArticleList} exact={true}/>
          <PrivateRoute path="/create" component={AddArticle} />
          <Route path="/view/:id" component={ViewArticle} />
          <PrivateRoute path="/edit/:id" component={EditArticle} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </div>
  </Router>
);

export default AppRouter;
