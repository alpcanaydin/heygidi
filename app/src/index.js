import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import App from './components/App';
import Home from './components/Home';
import Year from './components/Year';

import './index.css';

const Root = () => (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/year/:year" component={Year} />
    </Route>
    <Route path="*" component={() => hashHistory.push('/')} />
  </Router>
);

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
