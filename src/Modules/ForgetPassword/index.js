import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PumpkinLogo from '../../assets/pumpkin';
import NameLogo from '../../assets/name';
import './forgetPassword.scss';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      emailError: null,
    };
  }
  handleForgetPassword = (e) => {
    e.preventDefault();
    const { email } = this.state;
    axios({
      method: 'post',
      url: 'https://calm-waters-47062.herokuapp.com/auth/forgetPassword',
      data: {
        email,
      },
    })
      .then((res) => {
        this.props.history.push('/login');
        // TODO: Toast for the success
      })
      .catch((err) => {
        this.setState({
          emailError: err.response.data.errors.email || null,
        });
      });
  };
  handleState = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value, emailError: null });
  };

  render() {
    const { email, emailError } = this.state;
    return (
      <div className="forgetPassword">
        <div className="forgetPassword__logo">
          <div className="forgetPassword__logo__pumpkin">{PumpkinLogo}</div>
          <div className="forgetPassword__logo__name"><NameLogo id={5} /></div>
        </div>
        <form className="forgetPassword__form" onSubmit={this.handleForgetPassword}>
          <div className="forgetPassword__form__wrapper">
            <div className="forgetPassword__form__wrapper__inputWrapper">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                name="email"
                value={email}
                onChange={this.handleState}
              />
              <span className="forgetPassword__form__wrapper__inputWrapper__error">
                {emailError ? `* ${emailError}` : ''}
              </span>
            </div>
          </div>
        </form>
        <div className="forgetPassword__footer">
          <button
            className="forgetPassword__footer__button"
            onClick={this.handleForgetPassword}
          >
            Request Link
          </button>
          <Link to="/login" className="forgetPassword__footer__registerText">
            Already have an account? Sign In
          </Link>
        </div>
      </div>
    );
  }
}

export default Login;
