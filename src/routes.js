import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Start from './components/start/StartPage';
import Game from './containers/GamePage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Start}/>
    <Route path="/game" component={Game} />
  </Route>
);