import React, { lazy, Suspense } from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import Card from './components/Card';
import PrivateRoute from './PrivateRoute';

const Dashboard = lazy(() => import('./components/Dashboard'));
const Home = lazy(() => import('./components/Home'));
const Login = lazy(() => import('./Modules/Login'));
const Register = lazy(() => import('./Modules/Register'));
const Navbar = lazy(() => import('./components/Navbar'));
const ProfileSetting = lazy(() => import('./Modules/ProfileSetting'));
const forgetPassword = lazy(() => import('./Modules/ForgetPassword'));
const Profile = lazy(() => import('./Modules/Profie'));

const Routes = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Router>
        <Navbar />
        <Switch>
          <PrivateRoute path="/" component={Home} exact />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/recoverPassword" component={forgetPassword} />
          <Route path="/:username/setting" component={ProfileSetting} />
          <Route path="/:username" component={Profile} />
          {/* Route for tesing */}
          <Route path="/card" component={Card} />
        </Switch>
      </Router>
    </Suspense>
  );
};
export default Routes;
