import React, { Component } from 'react';
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
    return (
      <div>
        <div />
        <form onSubmit={this.handleLogin}>
          <input
            placeholder="Username"
            type="text"
            name="username"
            onChange={this.handleState}
          />
          <input
            placeholder="Password"
            type="password"
            name="password"
            onChange={this.handleState}
          />
          <button>Login!</button>
        </form>
      </div>
    );
  }
}

export default Login;
