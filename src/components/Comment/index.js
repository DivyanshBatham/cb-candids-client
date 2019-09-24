import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getBackgroundColor } from '../../helpers';
import './comment.scss';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: (props.commentItem && props.commentItem.comment) || null,
      username: (props.commentItem && props.commentItem.author.username) || null,
    };
  }
  // getBackgroundColor = () => {
  //   const { idx } = this.props;
  //   const availableColors = ['3FBF3E1', '#FAEEE1', '#F3F9EC', '#FDE8EF'];
  //   const totalColors = availableColors.length;
  //   return { backgroundColor: availableColors[idx % totalColors] };
  // };
  render() {
    const { comment, username, idx } = this.state;
    const userImage =
      'https://avatars0.githubusercontent.com/u/29652551?s=460&v=4';
    const postedTime = '15 mins';
    const { userComment } = this.props;
    return (
      <div className={userComment ? 'comment comment--self' : 'comment'}>
        <img
          className={userComment ? 'comment__image comment__image--self' : 'comment__image'}
          src={userImage}
          alt="user"
        />
        <div className="comment__content" style={getBackgroundColor(idx)}>
          <div className="comment__content__header">
            <span className="comment__content__header__username">
              {username}
            </span>
            <FontAwesomeIcon
              className="comment__content__header__icon"
              icon="ellipsis-v"
            />
          </div>
          <span className="comment__content__text">{comment}</span>
          <span className="comment__content__time">{postedTime} ago</span>
        </div>
      </div>
    );
  }
}

export default Comment;
