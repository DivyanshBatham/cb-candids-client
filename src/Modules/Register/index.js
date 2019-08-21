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
      const { success } = res.data;
      if (success) {
        const { token } = res.data;
<<<<<<< HEAD
        localStorage.setItem('cb-token', token);
        // TODO: Change the route here..
=======
        const { user } = res.data.data;
        this.handleLocalStorage('cb-token', token);
        this.handleLocalStorage('cb-username', user.username);
        localStorage.setItem('cb-email', user.email);
>>>>>>> 93e0a6d63ded7141d404a79e890c3d0c0f78fc31
        this.props.history.push('/');
      } else {
        // TODO:Add a Toast msg for warning
      }
    });
  };
  render() {
    const { username, password, email } = this.state;
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
            <label>
              <FontAwesomeIcon
                className="register--form--items--icon"
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
          <div className="register--form--items">
            <label>
              <FontAwesomeIcon
                className="register--form--items--icon"
                icon="at"
              />
            </label>
            <input
              type="email"
              placeholder="email"
              name="email"
              value={email}
              onChange={this.handleState}
            />
          </div>
          <div className="register--form--items">
            <label>
              <FontAwesomeIcon
                className="register--form--items--icon"
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
