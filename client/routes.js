import React from 'react';
import { browserHistory, IndexRoute, Route } from 'react-router';

import Base from './components/Base.jsx';
import HomePage from './components/HomePage.jsx';
import LoginPage from './containers/LoginPage.jsx';
import SignUpPage from './containers/SignUpPage.jsx';

const routes = (
  <Route path="/" component={Base}>
    <IndexRoute component={HomePage}></IndexRoute>
    <Route path="/login" component={LoginPage}></Route>
    <Route path="/signup" component={SignUpPage}></Route>
  </Route>
);

export default routes;
