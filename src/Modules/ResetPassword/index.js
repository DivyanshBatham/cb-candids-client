import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { passwordValidator } from '../../helpers';
import './resetPassword.scss';

class resetPassword extends Component {
  constructor() {
    super();
    this.state = {
      password: '',
      confirmPassword: '',
      passwordError: null,
      confirmPasswordError: null,
    };
  }
  handleSubmitPassword = (e) => {
    e.preventDefault();
    const { token } = this.props.match.params;
    const {
      password,
      confirmPassword,
      confirmPasswordError,
      passwordError,
    } = this.state;
    if (
      !passwordError &&
      !confirmPasswordError &&
      !password.length > 0 &&
      password === confirmPassword
    ) {
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
    }
  };
  handleState = (e) => {
    e.preventDefault();
    const { password, confirmPassword } = this.state;
    // if it is password then show the password message
    if (e.target.name === 'password') {
      const response = passwordValidator(e.target.value);
      this.setState({
        passwordError: response.length < 3 ? null : `Must contain ${response}`,
      });
    } else if (e.target.name === 'confirmPassword') {
      console.log(password, confirmPassword);
      this.setState({
        confirmPasswordError:
          password === e.target.value ? null : 'Password must be same!',
      });
    }

    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    console.log(this.state);
    const {
      password,
      confirmPassword,
      passwordError,
      confirmPasswordError,
    } = this.state;
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
            <div className="resetPassword--form--items--input">
              <label>
                <FontAwesomeIcon
                  className="resetPassword--form--items--input--icon"
                  icon="unlock-alt"
                />
              </label>
              <input
                type="text"
                required
                placeholder="New Password"
                name="password"
                value={password}
                onChange={this.handleState}
              />
            </div>
            <span className="resetPassword--form--items--error">
              {passwordError && password.length > 0
                ? `* ${passwordError}`
                : '   '}
            </span>
          </div>
          <div className="resetPassword--form--items">
            <div className="resetPassword--form--items--input">
              <label>
                <FontAwesomeIcon
                  className="resetPassword--form--items--input--icon"
                  icon="unlock-alt"
                />
              </label>
              <input
                type="text"
                required
                placeholder="Confirm Password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={this.handleState}
              />
            </div>
            <span className="resetPassword--form--items--error">
              {confirmPasswordError && confirmPassword.length > 0
                ? `* ${confirmPasswordError}`
                : '   '}
            </span>
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
