import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './forgetPassword.scss';

class forgetPassword extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
    };
  }
  handleSubmitPassword = (e) => {
    e.preventDefault();
    // here we call the api
  }
  handleState = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { email } = this.state;
    const userImage =
      'https://avatars0.githubusercontent.com/u/29652551?s=460&v=4';
    return (
      <div className="forgetPassword">
        <div className="forgetPassword--logo">
          <img src={userImage} alt="userProfile" />
          <span className="forgetPassword--logo--text"> CB-Candid </span>
        </div>
        <form className="forgetPassword--form" onSubmit={this.handleSubmitPassword}>
          <div className="forgetPassword--form--items">
            <label>
              <FontAwesomeIcon
                className="forgetPassword--form--items--icon"
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
          <button className="forgetPassword--form--button">Submit</button>
          <Link to="/login" className="forgetPassword--form--text">
                  Login
          </Link>
        </form>
      </div>
    );
  }
}

export default forgetPassword;
