import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './card.scss';

class Card extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    const userImage =
      'https://avatars0.githubusercontent.com/u/29652551?s=460&v=4';
    return (
      <div className="card">
        <div className="card--authorDetails">
          <img src={userImage} alt="user" />
          <span>authorName</span>
        </div>
        <img className="card--postImage" src={userImage} alt="post" />
        <div className="card--postDetails">
          <h4>Title</h4>
          <p>Description</p>
        </div>
        <div className="card--postStats">
          <div className="card--postStats--icons">
            <div>
              <FontAwesomeIcon icon={['far', 'comment']} />
              <span>count</span>
            </div>
            <div>
              <FontAwesomeIcon icon={['far', 'heart']} />
              <span>count</span>
            </div>
          </div>
          <span>15 mins ago</span>
        </div>
      </div>
    );
  }
}

export default Card;
