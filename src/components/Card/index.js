import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './card.scss';

class Card extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    console.log(this.props);
    const {author,imgSrc,title,description,comments,likes,createdAt} = this.props.post;
    const userImage =
      'https://avatars0.githubusercontent.com/u/29652551?s=460&v=4';
    return (
      <div className="card">
        <div className="card--authorDetails">
          <img src={author.imgSrc || userImage} alt="user" />
          <span>{author.username}</span>
        </div>
        <img className="card--postImage" src={imgSrc || userImage} alt="post" />
        <div className="card--postDetails">
          <h4 className="card--postDetails--title">{title}</h4>
          <p className="card--postDetails--description">{description}</p>
        </div>
        <div className="card--postStats">
          <div className="card--postStats--icons">
            <div className="card--postStats--icons--item">
              <FontAwesomeIcon
                icon={['far', 'comment']}
                className="card--postStats--icons--item--icon"
              />
              <span>{comments.length}</span>
            </div>
            <div>
              <FontAwesomeIcon
                icon={['far', 'heart']}
                className="card--postStats--icons--item--icon"
              />
              <span>{likes.length}</span>
            </div>
          </div>
          <span>{createdAt || '15 min ago'}</span>
        </div>
      </div>
    );
  }
}

export default Card;
