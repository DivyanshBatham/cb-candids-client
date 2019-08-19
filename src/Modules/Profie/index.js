import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Home from '../../components/Home';
import './profile.scss';

class Profile extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    const userImage =
      'https://avatars0.githubusercontent.com/u/29652551?s=460&v=4';
    const username = this.props.match.params.username;
    return (
      <div className="profile">
        <div className="profile--user">
          <img src={userImage} alt="user" className="profile--user--image" />
          <div className="profile--user--data">
            <div className="profile--user--data--username">
              <span className="profile--user--data--username--name">{username}</span>
              <FontAwesomeIcon
                className="profile--user--data--username--icon"
                icon="cog"
              />
            </div>
            <div className="profile--user--data--bio">bio</div>
          </div>
        </div>
        <div className="profile--postHeader" >Posts</div>
        <div>
          {/* TODO: add a card render component here */}
          <Home />
        </div>
      </div>
    );
  }
}

export default Profile;
