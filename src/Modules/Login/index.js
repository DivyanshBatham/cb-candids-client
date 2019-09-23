import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { addAuthDataToState } from '../../actions/authActions';
import { passwordValidator } from '../../helpers';
import PumpkinLogo from '../../assets/pumpkin';
import NameLogo from '../../assets/name';
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
    this.setState({
      emailError: null,
      passwordError: null,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === 'password') {
      const response = passwordValidator(password);
      this.setState({
        passwordError: response.length < 3 ? null : `Must contain ${response}`,
      });
    }
    // this.setState({ [e.target.name]: e.target.value });
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
        console.log('login data-->', res.data);
        const { success, token } = res.data;
        if (success) {
          const { user } = res.data.data;
          const userData = { ...user };
          this.props.addAuthDataToState(userData);
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
      email, password, loggedIn, emailError, passwordError,
    } = this.state;

    // If it's not redirected from anywhere, after login send it to /
    const { from } = this.props.location.state || { from: { pathname: '/' } };

    // Redirect to where user came from, if he came from no where then send to /.
    if (localStorage.getItem('cb-token') && loggedIn) {
      return <Redirect to={from} />;
    }
    return (
      <div className="login">
        <div className="login__logo">
          <div className="login__logo__pumpkin">{PumpkinLogo}</div>
          <div className="login__logo__name"><NameLogo id={2} /></div>
        </div>
        <form className="login__form" onSubmit={this.handleLogin}>
          <div className="login__form__wrapper">
            <div className="login__form__wrapper__inputWrapper">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                aria-label="Email"
                placeholder="Enter your email"
                value={email}
                onChange={this.handleState}
              />
              <span className="login__form__wrapper__inputWrapper__error">
                {emailError ? `* ${emailError}` : '   '}
              </span>
            </div>
            <div className="login__form__wrapper__inputWrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                aria-label="passWord"
                placeholder="Enter your password"
                value={password}
                onChange={this.handleState}
              />
              <span className="login__form__wrapper__inputWrapper__error">
                {passwordError && password.length > 0
                  ? `* ${passwordError}`
                  : '   '}
              </span>
            </div>
          </div>
        </form>
        <div className="login__footer">
          <Link to="/forgetPassword" className="login__footer__forgetText">
            Forgot password?
          </Link>
          <button className="login__footer__button" onClick={this.handleLogin}>
            {' '}
            Sign In
          </button>
          <Link to="/register" className="login__footer__registerText">
            Don’t have an account? Sign Up
          </Link>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { addAuthDataToState },
)(Login);
