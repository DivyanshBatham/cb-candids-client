import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './profileSetting.scss';

class profileSetting extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      bio: '',
      pushNotification: false,
    };
  }
  handleUpdateText = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };
  handlePushNotificationState = (e) => {
    e.preventDefault();
    this.setState(prevState => ({
      pushNotification: !prevState.pushNotification,
    }));
  };
  handleUpdateProfile = (e) => {
    e.preventDefault();
    console.log(this.state);
  }
  render() {
    const { username, bio, pushNotification } = this.state;
    const userImage =
      'https://avatars0.githubusercontent.com/u/29652551?s=460&v=4';
    console.log(this.state);
    return (
      <div className="profileSetting">
        <div className="profileSetting--logo">
          <img src={userImage} alt="userProfile" />
          <span className="profileSetting--logo--text"> CB-Candid </span>
        </div>
        <form className="profileSetting--form" onSubmit={this.handleUpdateProfile}>
          <div className="profileSetting--form--items">
            <label>
              <FontAwesomeIcon
                className="profileSetting--form--items--icon"
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
          <div className="profileSetting--form--items">
            <label>
              <FontAwesomeIcon
                className="profileSetting--form--items--icon"
                icon="info-circle"
              />
            </label>
            <input
              type="text"
              placeholder="Bio"
              name="bio"
              value={bio}
              onChange={this.handleState}
            />
          </div>
          <button
            onClick={this.handlePushNotificationState}
            className={`profileSetting--form--button profileSetting--form--button--${
              pushNotification ? 'enabled' : 'disabled'
            }`}
          >
            {`${pushNotification ? 'Disable' : 'Enable'}-Push-notification`}
          </button>
          <button className="profileSetting--form--button">
            Update Profile
          </button>
        </form>
      </div>
    );
  }
}

export default profileSetting;
