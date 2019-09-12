import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import styles from './index.scss';
import Routes from './routes';
import './fontawesome-lib';

const Index = () => (
  <Router>
    <Routes />
  </Router>
);

ReactDOM.render(<Index />, document.getElementById('index'));
