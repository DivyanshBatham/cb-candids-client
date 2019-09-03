import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './comment.scss';

class Comment extends Component {
  constructor() {
    super();
    this.state = {};
  }
  getBackgroundColor = () => {
    const { idx } = this.props;
    const availableColors = ['3FBF3E1', '#FAEEE1', '#F3F9EC', '#FDE8EF'];
    const totalColors = availableColors.length;
    // const randomNumber = Math.floor(Math.random() * totalColors);
    return { backgroundColor: availableColors[idx % totalColors] };
  }
  render() {
    const userImage =
      'https://avatars0.githubusercontent.com/u/29652551?s=460&v=4';
    const username = 'Author Name';
    const comment =
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores';
    const postedTime = '15 mins';
    const { userComment } = this.props;
    return (
      <div className="comment" style={userComment && { flexDirection: 'row-reverse' }}>
        <img className="comment--image" src={userImage} alt="user" style={userComment && { marginRight: '0rem', marginLeft: '1rem' }} />
        <div className="comment--content" style={this.getBackgroundColor()} >
          <div className="comment--content--header">
            <span className="comment--content--header--username">{username}</span>
            <FontAwesomeIcon
              className="comment--content--header--icon"
              icon="ellipsis-v"
            />
          </div>
          <span className="comment--content--text">{comment}</span>
          <span className="comment--content--time">{postedTime} ago</span>
        </div>
      </div>
    );
  }
}

export default Comment;
