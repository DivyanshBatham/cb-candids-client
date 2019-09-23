/* eslint-disable no-underscore-dangle */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducer from './reducers';
import styles from './index.scss';
import Routes from './routes';
import './fontawesome-lib';

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk)),
);
const Index = () => (
  <Provider store={store}>
    <Router>
      <Routes />
    </Router>
  </Provider>
);

ReactDOM.render(<Index />, document.getElementById('index'));
