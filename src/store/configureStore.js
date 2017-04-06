import {createStore, compose, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import saga from '../sagas';
import rootReducer from '../reducers';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

function configureStoreProd(initialState) {
  const middlewares = [
    sagaMiddleware
  ];

  const store = createStore(rootReducer, initialState, compose(
      applyMiddleware(...middlewares)
    )
  );

  // then run the saga
  sagaMiddleware.run(saga);

  return store;
}

function configureStoreDev(initialState) {
  const middlewares = [
    logger,
    sagaMiddleware
  ];

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
  const store = createStore(rootReducer, initialState, composeEnhancers(
      applyMiddleware(...middlewares)
    )
  );

  // then run the saga
  sagaMiddleware.run(saga);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;

export default configureStore;