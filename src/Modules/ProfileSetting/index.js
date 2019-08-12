import React, { Component } from 'react';
import './profileSetting.scss';

class profileSetting extends Component {
  constructor() {
    super();
    this.state = {
      username: 'adsfa',
      bio: 'asfda',
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
  }
  render() {
    const {
      username,
      bio,
      pushNotification,
    } = this.state;
    const userImage = 'https://avatars0.githubusercontent.com/u/29652551?s=460&v=4';
    console.log(this.state);
    return (
      <div className="profileSetting">
        <div className="profileSetting--userAvatar">
          <img src={userImage} alt="userProfile" />
        </div>
        <div className="profileSetting--userDetails">
          <div className="profileSetting--userDetails--field">
            <span>Username</span>
            <input
              value={username}
              name="username"
              onChange={this.handleUpdateText}
            />
          </div>
          <div className="profileSetting--userDetails--field">
            <span>Bio</span>
            <textarea
              value={bio}
              name="bio"
              onChange={this.handleUpdateText}
            />
          </div>
          <div className="profileSetting--userDetails--field">
            <span>Push Notification</span>
            <button onClick={this.handlePushNotificationState}>{pushNotification ? 'Disable' : 'Enable'}</button>
          </div>
          <button>Update Profile</button>
        </div>
            {/* <form className="profileSetting--userDetails">
            <label>username</label>
             <input />
             <label>username</label>
             <input />
             <label>username</label>
             <input />
             <label>username</label>
             <input />
             <label>username</label>
             <input />
            </form> */}
          
      </div>
    );
  }
}

export default profileSetting;
