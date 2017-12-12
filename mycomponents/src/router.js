import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import Getusers from './routes/Getusers';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Getusers} />
      </Switch>
    </Router>
  );
}
 
export default RouterConfig;
