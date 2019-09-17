import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { passwordValidator } from '../../helpers';
import PumpkinLogo from '../../assets/pumpkin';
import NameLogo from '../../assets/name';
import './register.scss';

class register extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
      usernameError: null,
      emailError: null,
      passwordError: null,
    };
  }
  handleLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
  };
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
  handleRegister = (e) => {
    e.preventDefault();
    const {
      username, email, password, passwordError,
    } = this.state;
    if (passwordError || username.length === 0 || email.length === 0) return;
    const url = 'https://calm-waters-47062.herokuapp.com/auth/register';
    axios({
      method: 'post',
      url,
      data: {
        username,
        email,
        password,
      },
    })
      .then((res) => {
        console.log(res);
        const { success } = res.data;
        if (success) {
          const { token } = res.data;
          const { user } = res.data.data;
          this.handleLocalStorage('cb-token', token);
          this.handleLocalStorage('cb-username', user.username);
          this.handleLocalStorage('cb-email', user.email);
          this.props.history.push('/');
        }
      })
      .catch((err) => {
        console.log(err.response);
        this.setState({
          usernameError: err.response.data.errors.username || null,
          emailError: err.response.data.errors.email || null,
          passwordError: err.response.data.errors.password || null,
        });
      });
  };
  render() {
    const {
      username,
      password,
      email,
      usernameError,
      emailError,
      passwordError,
    } = this.state;
    return (
      <div className="register">
        <div className="register__logo">
          <div className="register__logo__pumpkin">{PumpkinLogo}</div>
          <div className="register__logo__name"><NameLogo id={3} /></div>
        </div>
        <form className="register__form" onSubmit={this.handleRegister}>
          <div className="register__form__wrapper">
            <div className="register__form__wrapper__inputWrapper">
              <label htmlFor="email">Username</label>
              <input
                type="text"
                name="username"
                aria-label="Email"
                placeholder="Enter your email"
                value={username}
                onChange={this.handleState}
              />
              <span className="register__form__wrapper__inputWrapper__error">
                {usernameError ? `* ${usernameError}` : '   '}
              </span>
            </div>
            <div className="register__form__wrapper__inputWrapper">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                aria-label="Email"
                placeholder="Enter your email"
                value={email}
                onChange={this.handleState}
              />
              <span className="register__form__wrapper__inputWrapper__error">
                {emailError ? `* ${emailError}` : '   '}
              </span>
            </div>
            <div className="register__form__wrapper__inputWrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                aria-label="passWord"
                placeholder="Enter your password"
                value={password}
                onChange={this.handleState}
              />
              <span className="register__form__wrapper__inputWrapper__error">
                {passwordError && password.length > 0
                  ? `* ${passwordError}`
                  : '   '}
              </span>
            </div>
          </div>
        </form>
        <div className="register__footer">
          <button
            className="register__footer__button"
            onClick={this.handleRegister}
          >
            {' '}
            Sign Up
          </button>
          <Link to="/login" className="register__footer__registerText">
            Already have an account? Sign In
          </Link>
        </div>
      </div>
    );
  }
}

export default register;
