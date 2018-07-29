import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import AddArticle from '../components/AddArticle';
import Header from '../components/Header'
import MainPage from '../components/MainPage';
import NotFoundPage from '../components/NotFoundPage';
import ViewArticle from '../components/ViewArticle'
import EditArticle from '../components/EditArticle';
 
export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
    <Header />
      <Switch>
        <Route path="/" component={MainPage} exact={true} />
        <Route path="/create" component={AddArticle} />
        <Route path="/view/:id" component={ViewArticle} />
        <Route path="/edit/:id" component={EditArticle} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
