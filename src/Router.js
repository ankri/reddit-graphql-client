import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import SubredditGraphQLContainer from './subreddit/SubredditGraphQLContainer';
import UserGraphQLContainer from './user/UserGraphQLContainer';

const RootRouter = () => (
  <Router>
    <Switch>
      <Route path="/r/:subreddit" component={SubredditGraphQLContainer} />
      <Route path="/u/:user" component={UserGraphQLContainer} />
      <Route exact path="/">
        <Redirect to="/r/pics" />
      </Route>
    </Switch>
  </Router>
);

export default RootRouter;
