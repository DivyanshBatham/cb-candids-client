import React, { lazy, Suspense } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { addLoginData } from './actions';
import Card from './components/Card';
import Comment from './components/Comment';
import PrivateRoute from './PrivateRoute';

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

class Routes extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    const token = localStorage.getItem('cb-token');
    const username = localStorage.getItem('cb-username');
    const { stateData } = this.props;
    if (JSON.stringify(stateData) === '{}' && token) {
      axios({
        method: 'get',
        url: `https://calm-waters-47062.herokuapp.com/users/${username}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('cb-token')}`,
        },
      }).then((res) => {
        if (res.data.success) {
          this.props.addLoginData(res.data.data.user);
        }
      });
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
            <PrivateRoute
              sensitive
              path="/user/:username"
              component={Profile}
            />
            <PrivateRoute path="/post/:postId" component={PostDetails} />
            {/* Route for tesing */}
            <Route path="/card" component={Card} />
            <Route path="/comment" component={Comment} />
            <Route path="/navbar" component={Navbar} />
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
export default connect(mapStateToProps, { addLoginData })(withRouter(Routes));
