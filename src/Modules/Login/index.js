import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import './login.scss';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
  }
  handleState = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };
  handleLogin = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    console.log(username, password);
  };

  render() {
    const { username, password } = this.state;
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
                icon="user"
              />
            </label>
            <input
              type="text"
              placeholder="username"
              name="username"
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
          <Link to="/recoverPassword" className="login--form--text">
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
