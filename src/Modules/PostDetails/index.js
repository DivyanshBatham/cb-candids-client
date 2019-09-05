import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import CommentBox from '../../components/CommentBox';
import Card from '../../components/Card';
import Comment from '../../components/Comment';
import './postDetails.scss';

class PostDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: this.props.location.state,
      errorMessage: null,
    };
  }
  componentDidMount() {
    if (this.props.location.state === undefined) {
      axios({
        method: 'get',
        url: `https://calm-waters-47062.herokuapp.com/posts/${this.props.match.params.postId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('cb-token')}`,
        },
      })
        .then((res) => {
          if (res.data.success) {
            this.setState({ post: res.data.data.post });
          }
        })
        .catch(err => this.setState({ errorMessage: 'Post Not Found!' }));
    }
  }
  isAuthorComment = (comment) => {
    const currentUser = localStorage.getItem('cb-username');
    return comment.author.username === currentUser;
  };
  render() {
    const { post } = this.state;
    const comments = post && post.comments;
    return (
      <div className="postDetails">
        <div className="container">
          {post ? (
            <React.Fragment>
              <Card post={post} />
              <div className="postDetails--commets">
                {comments.map((comment, idx) => (
                  <Comment
                    idx={idx}
                    commentItem={comment}
                    userComment={this.isAuthorComment(comment)}
                  />
                ))}
              </div>
            </React.Fragment>
          ) : (
            <div>Loading</div>
          )}
        </div>
        <div className="postDetails--commentBox">
          <CommentBox />
        </div>
      </div>
    );
  }
}
PostDetails.propTypes = {
  location: PropTypes.oneOfType(Object).isRequired,
};

export default withRouter(PostDetails);
