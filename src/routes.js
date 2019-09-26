import React, { lazy, Suspense } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addAuthData } from './actions/authActions';
import Card from './components/Card';
import Comment from './components/Comment';
import PrivateRoute from './PrivateRoute';
import ConfirmationModal from './components/ConfirmationModal';

const Dashboard = lazy(() => import('./components/Dashboard'));
const Home = lazy(() => import('./Modules/Home'));
const Login = lazy(() => import('./Modules/Login'));
const Register = lazy(() => import('./Modules/Register'));
const Navbar = lazy(() => import('./components/Navbar'));
const Footer = lazy(() => import('./components/Footer'));
const ProfileSetting = lazy(() => import('./Modules/ProfileSetting'));
const forgetPassword = lazy(() => import('./Modules/ForgetPassword'));
const Profile = lazy(() => import('./Modules/Profie'));
const VerifyEmail = lazy(() => import('./Modules/VerifyEmail'));
const resetPassword = lazy(() => import('./Modules/ResetPassword'));
const PostDetails = lazy(() => import('./Modules/PostDetails'));
const Upload = lazy(() => import('./Modules/Upload'));

class Routes extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    const token = localStorage.getItem('cb-token');
    const { stateData } = this.props;
    if (!stateData.username && token) {
      this.props.addAuthData();
    }
  }
  render() {
    return (
      <Suspense fallback={<div>loading...</div>}>
        <Navbar />
        <main>
          <Switch>
            <PrivateRoute path="/" component={Home} exact />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/verifyEmail/:token" component={VerifyEmail} />
            <Route path="/forgetPassword" component={forgetPassword} />
            <Route path="/resetPassword/:token" component={resetPassword} />
            <PrivateRoute path="/setting" component={ProfileSetting} />
            <PrivateRoute path="/upload" component={Upload} />
            <PrivateRoute
              sensitive
              path="/user/:username"
              component={Profile}
            />
            <PrivateRoute path="/post/:postId" component={PostDetails} />
          </Switch>
        </main>
        <Footer />
      </Suspense>
    );
  }
}
function mapStateToProps(state) {
  return {
    stateData: state,
  };
}
export default connect(mapStateToProps, { addAuthData })(withRouter(Routes));
