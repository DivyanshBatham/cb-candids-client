import React, { Component } from 'react';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
    };
  }
  handleState = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };
  handleRegister = (e) => {
    e.preventDefault();
    const { username, email, password } = this.state;
    console.log(username, email, password);
  };
  handleAuth = (e) => {
    e.preventDefault();
    const authUrl = 'http://localhost:4500/auth/google';
    window.location.href = authUrl;
  };
  render() {
    return (
      <div>
        <div />
        <form onSubmit={this.handleRegister}>
          <input
            placeholder="Username"
            name="username"
            type="text"
            onChange={this.handleState}
          />
          <input
            placeholder="Email"
            name="email"
            type="email"
            onChange={this.handleState}
          />
          <input
            placeholder="Password"
            name="password"
            type="password"
            onChange={this.handleState}
          />
          <button>Register!</button>
        </form>
        <div>
          <button onClick={this.handleAuth}>Register with Google</button>
        </div>
      </div>
    );
  }
}

export default Register;
