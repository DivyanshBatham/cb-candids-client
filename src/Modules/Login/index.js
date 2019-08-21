import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import './login.scss';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      loggedIn: false,
    };
  }
  handleState = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };
  handleLocalStorage = (key,value)=> {
    localStorage.setItem(key,value);
  }
  handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const url = 'https://calm-waters-47062.herokuapp.com/auth/login';
    const data = {
      email,
      password,
    };
    axios({
      method: 'post',
      url,
      data,
    }).then((res) => {
      const { success, token } = res.data;
      if (success) {
        const { user } = res.data.data;
        this.handleLocalStorage('cb-token', token);
        this.handleLocalStorage('cb-username', user.username);
<<<<<<< HEAD
        this.handleLocalStorage('cb-email', user.email);
=======
        localStorage.setItem('cb-email', user.email);
>>>>>>> 93e0a6d63ded7141d404a79e890c3d0c0f78fc31
        this.setState({ loggedIn: true });
        // this.props.history.push('/');
      } else {
        // TODO: Toast for valid credential
        console.log('enter valid username of password');
      }
    });
  };

  render() {
    const { username, password, loggedIn } = this.state;
    // If it's not redirected from anywhere, after login send it to /
    const { from } = this.props.location.state || { from: { pathname: '/' } };

    // Redirect to where user came from, if he came from no where then send to /.
    if (localStorage.getItem('cb-token') && loggedIn) return <Redirect to={from} />;

    const userImage =
      'https://avatars0.githubusercontent.com/u/29652551?s=460&v=4';
    return (
      <div className="login">
        <div className="login--logo">
          <img src={userImage} alt="userProfile" />
          <span className="login--logo--text"> CB-Candid </span>
        </div>
        <form className="login--form" onSubmit={this.handleLogin}>
          <div className="login--form--items">
            <label>
              <FontAwesomeIcon
                className="login--form--items--icon"
                icon="at"
              />
            </label>
            <input
              type="email"
              placeholder="email"
              name="email"
              value={username}
              onChange={this.handleState}
            />
          </div>
          <div className="login--form--items">
            <label>
              <FontAwesomeIcon
                className="login--form--items--icon"
                icon="unlock-alt"
              />
            </label>
            <input
              type="password"
              placeholder="password"
              name="password"
              value={password}
              onChange={this.handleState}
            />
          </div>
          <Link to="/forgetPassword" className="login--form--text">
            Forgot password?
          </Link>
          <button className="login--form--button">Log In</button>
          <Link to="/register" className="login--form--text">
            Register
          </Link>
        </form>
      </div>
    );
  }
}

export default Login;
