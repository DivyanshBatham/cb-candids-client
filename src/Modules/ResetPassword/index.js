import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { passwordValidator } from '../../helpers';
import PumpkinLogo from '../../assets/pumpkin';
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
      password.length > 0 &&
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
    const { password } = this.state;
    // if it is password then show the password message
    if (e.target.name === 'password') {
      const response = passwordValidator(e.target.value);
      this.setState({
        passwordError: response.length < 3 ? null : `Must contain ${response}`,
      });
    } else if (e.target.name === 'confirmPassword') {
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
    const {
      password,
      confirmPassword,
      passwordError,
      confirmPasswordError,
    } = this.state;
    return (
      <div className="resetPassword">
        <div className="resetPassword__logo">
          <div className="resetPassword__logo__pumpkin">{PumpkinLogo}</div>
          <div className="resetPassword__logo__name"><NameLogo id={4} /></div>
        </div>
        <form
          className="resetPassword__form"
          onSubmit={this.handleSubmitPassword}
        >
          <div className="resetPassword__form__wrapper">
            <div className="resetPassword__form__wrapper__inputWrapper">
              <label htmlFor="new-password">New Password</label>
              <input
                id="new-password"
                type="password"
                required
                placeholder="Enter your new password"
                name="password"
                value={password}
                onChange={this.handleState}
              />
              <span className="resetPassword__form__wrapper__inputWrapper__error">
                {passwordError && password.length > 0
                  ? `* ${passwordError}`
                  : '   '}
              </span>
            </div>
            <div className="resetPassword__form__wrapper__inputWrapper">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                id="confirm-password"
                type="password"
                required
                placeholder="Enter your confirm password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={this.handleState}
              />
              <span className="resetPassword__form__wrapper__inputWrapper__error">
                {confirmPasswordError && confirmPassword.length > 0
                  ? `* ${confirmPasswordError}`
                  : '   '}
              </span>
            </div>
          </div>
        </form>
        <div className="resetPassword__footer">
          <button
            className="resetPassword__footer__button"
            onClick={this.handleSubmitPassword}
          >
            {' '}
            Reset Password
          </button>
          <Link to="/login" className="resetPassword__footer__registerText">
            Already have an account? Sign In
          </Link>
        </div>
      </div>
    );
  }
}

export default resetPassword;
