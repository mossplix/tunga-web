import { createStore, applyMiddleware,compose } from 'redux'
import { routerMiddleware }             from 'react-router-redux';
import createLogger                     from 'redux-logger';
import thunkMiddleware                  from 'redux-thunk';
import reduxPromise from 'redux-promise';
import reducers from '../reducers/index'

const loggerMiddleware = createLogger({
  level: 'info',
  collapsed: true,
});

const createStoreWithMiddleware = compose(applyMiddleware(thunkMiddleware,reduxPromise,loggerMiddleware),window.devToolsExtension ? window.devToolsExtension() : f => f)(createStore);
const store=createStoreWithMiddleware(reducers);

module.exports = store;