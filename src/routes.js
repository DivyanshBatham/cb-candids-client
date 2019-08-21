import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
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
const VerifyEmail = lazy(() => import('./Modules/VerifyEmail'));
const resetPassword = lazy(() => import('./Modules/ResetPassword'));

const Routes = (props) => {
  console.log(props);
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Navbar />
      <Switch>
        <PrivateRoute path="/" component={Home} exact />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/verifyEmail/:token" component={VerifyEmail} />
        <Route path="/forgetPassword" component={forgetPassword} />
        <Route path="/resetPassword/:token" component={resetPassword} />
        <PrivateRoute path="/setting" component={ProfileSetting} />
        <PrivateRoute path="/user/:username" component={Profile} />
        {/* Route for tesing */}
        <Route path="/card" component={Card} />
      </Switch>
    </Suspense>
  );
};
export default withRouter(Routes);
