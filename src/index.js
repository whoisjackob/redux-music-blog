import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { applyMiddleware, createStore } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import thunk from 'redux-thunk';
import rootReducer from './store/reducers';
import { Provider } from 'react-redux';

const initialState = {};

const middleware = [apiMiddleware, thunk];

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware),
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
