/* eslint-disable no-underscore-dangle */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';
import styles from './index.scss';
import Routes from './routes';
import './fontawesome-lib';

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
const Index = () => (
  <Provider store={store}>
    <Router>
      <Routes />
    </Router>
  </Provider>
);

ReactDOM.render(<Index />, document.getElementById('index'));
