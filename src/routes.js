import React, { lazy, Suspense } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

const Dashboard = lazy(() => import('./components/Dashboard'));
const Home = lazy(() => import('./components/Home'));
const Login = lazy(() => import('./Modules/Login'));
const Register = lazy(() => import('./Modules/Register'));

const Routes = () => (
  <div>
    <Suspense fallback={<div>loading...</div>}>
      <Router>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </Router>
    </Suspense>
  </div>
);
export default Routes;
