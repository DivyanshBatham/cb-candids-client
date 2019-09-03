import React, { Component } from 'react';
import CommentBox from '../../components/CommentBox';
import Card from '../../components/Card';
import Comment from '../../components/Comment';
import './postDetails.scss';

class PostDetails extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (
      <div className="postDetails">
        <div className="container">
          <Card />
          <div className="postDetails--commets">
            <Comment userComment />
            {arr.map((item, idx) => (
              <Comment idx={idx} />
            ))}
          </div>
        </div>
        <div className="postDetails--commentBox">
          <CommentBox />
        </div>
      </div>
    );
  }
}

export default PostDetails;
