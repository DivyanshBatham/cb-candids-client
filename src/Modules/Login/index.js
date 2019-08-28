import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { passwordValidator } from '../../helpers';
import './login.scss';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      loggedIn: false,
      emailError: null,
      passwordError: null,
    };
  }
  handleState = (e) => {
    e.preventDefault();
    const password = e.target.value;
    if (e.target.name === 'password') {
      const response = passwordValidator(password);
      this.setState({
        passwordError: response.length < 3 ? null : `Must contain ${response}`,
      });
    }
    this.setState({ [e.target.name]: e.target.value });
  };
  handleLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
  };
  handleLogin = (e) => {
    e.preventDefault();
    const { email, password, passwordError } = this.state;
    if (passwordError) return;
    const url = 'https://calm-waters-47062.herokuapp.com/auth/login';
    const data = {
      email,
      password,
    };
    axios({
      method: 'post',
      url,
      data,
    })
      .then((res) => {
        console.log(res.data);
        const { success, token } = res.data;
        if (success) {
          const { user } = res.data.data;
          this.handleLocalStorage('cb-token', token);
          this.handleLocalStorage('cb-username', user.username);
          this.handleLocalStorage('cb-email', user.email);
          this.setState({ loggedIn: true });
        }
      })
      .catch((err) => {
        this.setState({
          emailError: err.response.data.errors.email || null,
          passwordError: err.response.data.errors.password || null,
        });
      });
  };

  render() {
    const {
      username,
      password,
      loggedIn,
      emailError,
      passwordError,
    } = this.state;
    // If it's not redirected from anywhere, after login send it to /
    const { from } = this.props.location.state || { from: { pathname: '/' } };

    // Redirect to where user came from, if he came from no where then send to /.
    if (localStorage.getItem('cb-token') && loggedIn) {
      return <Redirect to={from} />;
    }

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
            <div className="login--form--items--input">
              <label>
                <FontAwesomeIcon
                  className="login--form--items--input--icon"
                  icon="at"
                />
              </label>
              <input
                required
                type="email"
                placeholder="email"
                name="email"
                value={username}
                onChange={this.handleState}
              />
            </div>
            <span className="login--form--items--error">
              {emailError ? `* ${emailError}` : '   '}
            </span>
          </div>
          <div className="login--form--items">
            <div className="login--form--items--input">
              <label>
                <FontAwesomeIcon
                  className="login--form--items--input--icon"
                  icon="unlock-alt"
                />
              </label>
              <input
                required
                type="password"
                placeholder="password"
                name="password"
                value={password}
                onChange={this.handleState}
              />
            </div>
            <span className="login--form--items--error">
              {passwordError && password.length > 0 ? `* ${passwordError}` : '   '}
            </span>
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
