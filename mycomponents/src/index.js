import dva from 'dva';
import './index.css';
import List from './routes/List';
import { Router, Route, Switch } from 'dva/router';

const app = dva();

app.model(require('./models/users'));


function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={List} />
      </Switch>
    </Router>
  );
}


app.router(RouterConfig);

app.start('#root');