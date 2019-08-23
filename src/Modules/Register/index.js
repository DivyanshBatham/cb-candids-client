import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './register.scss';

class Register extends Component {
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
    this.setState({ [e.target.name]: e.target.value });
  };
  handleRegister = (e) => {
    e.preventDefault();
    const { username, email, password } = this.state;
    const url = 'https://calm-waters-47062.herokuapp.com/auth/register';
    axios({
      method: 'post',
      url,
      data: {
        username,
        email,
        password,
      },
    }).then((res) => {
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
    }).catch((err) => {
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
      username, password, email, usernameError, emailError, passwordError,
    } = this.state;
    const userImage =
      'https://avatars0.githubusercontent.com/u/29652551?s=460&v=4';
    return (
      <div className="register">
        <div className="register--logo">
          <img src={userImage} alt="userProfile" />
          <span className="register--logo--text"> CB-Candid </span>
        </div>
        <form className="register--form" onSubmit={this.handleRegister}>
          <div className="register--form--items">
            <div className="register--form--items--inputField">
              <label>
                <FontAwesomeIcon
                  className="register--form--items--inputField--icon"
                  icon="user"
                />
              </label>
              <input
                required
                type="text"
                placeholder="username"
                name="username"
                value={username}
                onChange={this.handleState}
              />
            </div>
            <span className="register--form--items--error">{usernameError ? `* ${usernameError}` : '   '}</span>
          </div>
          <div className="register--form--items">
            <div className="register--form--items--inputField">
              <label>
                <FontAwesomeIcon
                  className="register--form--items--inputField--icon"
                  icon="at"
                />
              </label>
              <input
                required
                type="email"
                placeholder="email"
                name="email"
                value={email}
                onChange={this.handleState}
              />
            </div>
            <span className="register--form--items--error">{emailError ? `* ${emailError}` : '   '}</span>
          </div>
          <div className="register--form--items">
            <div className="register--form--items--inputField">
              <label>
                <FontAwesomeIcon
                  className="register--form--items--inputField--icon"
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
            <span className="register--form--items--error">{passwordError ? `* ${passwordError}` : '   '}</span>
          </div>
          <button className="register--form--button">Register</button>
          <Link to="/login" className="register--form--text">
            Login!
          </Link>
        </form>
      </div>
    );
  }
}

export default Register;
