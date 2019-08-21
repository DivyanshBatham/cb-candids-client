import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import './resetPassword.scss';

class resetPassword extends Component {
  constructor() {
    super();
    this.state = {
      password: '',
      confirmPassword: '',
    };
  }
  handleSubmitPassword = (e) => {
    e.preventDefault();
    const { token } = this.props.match.params;
    const { password, confirmPassword } = this.state;
    if (password.length > 0 && password === confirmPassword) {
      axios({
        method: 'post',
        url: 'https://calm-waters-47062.herokuapp.com/auth/resetPassword',
        data: {
          password,
          token,
        },
      })
        .then((res) => {
          const { success } = res.data;
          console.log(success);
          if (success) {
            const { token } = res.data;
            localStorage.setItem('cb-token', token);
            localStorage.setItem('cb-email', res.data.data.user.email);
            localStorage.setItem('cb-username', res.data.data.user.username);
            this.props.history.push('/');
          }
        })
        .catch(err => console.log(err));
    } else {
      // TODO: Show the toast message for password mis-match
      console.log('password missmatch');
    }
  };
  handleState = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { password, confirmPassword } = this.state;
    const userImage =
      'https://avatars0.githubusercontent.com/u/29652551?s=460&v=4';
    return (
      <div className="resetPassword">
        <div className="resetPassword--logo">
          <img src={userImage} alt="userProfile" />
          <span className="resetPassword--logo--text"> CB-Candid </span>
        </div>
        <form
          className="resetPassword--form"
          onSubmit={this.handleSubmitPassword}
        >
          <div className="resetPassword--form--items">
            <label>
              <FontAwesomeIcon
                className="resetPassword--form--items--icon"
                icon="unlock-alt"
              />
            </label>
            <input
              type="text"
              placeholder="New Password"
              name="password"
              value={password}
              onChange={this.handleState}
            />
          </div>
          <div className="resetPassword--form--items">
            <label>
              <FontAwesomeIcon
                className="resetPassword--form--items--icon"
                icon="unlock-alt"
              />
            </label>
            <input
              type="text"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={this.handleState}
            />
          </div>
          <button className="resetPassword--form--button">Submit</button>
          <Link to="/login" className="resetPassword--form--text">
            Login
          </Link>
        </form>
      </div>
    );
  }
}

export default resetPassword;
