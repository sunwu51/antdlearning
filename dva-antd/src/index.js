import dva from 'dva';
import './index.css';
import Getusers from './routes/Getusers';
import { Router, Route, Switch } from 'dva/router';

const app = dva();

app.model(require('./models/users'));


function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Getusers} />
      </Switch>
    </Router>
  );
}


app.router(RouterConfig);

app.start('#root');