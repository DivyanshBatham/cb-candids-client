import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
    console.log(this.state);
    return (
      <div className="login">
        <div className="login--logo">
          <img src={userImage} alt="userProfile" />
          <span> CB-Candid </span>
        </div>
        <form className="login--form" onSubmit={this.handleLogin}>
          <div className="login--form--items">
            <label>
              <FontAwesomeIcon
                icon={['fas', 'user']}
                // icon="edit"
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
            <label>Password</label>
            <input
              type="password"
              placeholder="password"
              name="password"
              value={password}
              onChange={this.handleState}
            />
          </div>
          <button className="login--form--button">Sign In!!</button>
        </form>
      </div>
    );
  }
}

export default Login;
