import React, { lazy, Suspense } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

const Dashboard = lazy(() => import('./components/Dashboard'));
const Home = lazy(() => import('./components/Home'));
const Login = lazy(() => import('./Modules/Login'));
const Register = lazy(() => import('./Modules/Register'));
const Navbar = lazy(() => import('./components/Navbar'));
const ProfileSetting = lazy(() => import('./Modules/ProfileSetting'));

const Routes = () => (
  <Suspense fallback={<div>loading...</div>}>
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/:username/setting" component={ProfileSetting} />
      </Switch>
    </Router>
  </Suspense>
);
export default Routes;
