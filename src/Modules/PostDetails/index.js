/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CommentBox from '../../components/CommentBox';
import Card from '../../components/Card';
import Comment from '../../components/Comment';
import './postDetails.scss';

class PostDetails extends Component {
  constructor(props) {
    super(props);
    const findPostFromState = () => {
      const id = this.props.match.params.postId;
      const matchedPost = this.props.postsData.posts.filter(post => post._id === id);
      return { ...matchedPost[0] };
    };
    this.state = {
      post: findPostFromState(),
      comments: findPostFromState().comments,
      errorMessage: null,
    };
  }
  componentDidMount() {
    if (this.props.postsData.posts.length === 0) {
      // alert('fetching individual post');
      axios({
        method: 'get',
        url: `https://calm-waters-47062.herokuapp.com/posts/${this.props.match.params.postId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('cb-token')}`,
        },
      })
        .then((res) => {
          if (res.data.success) {
            this.setState({
              post: res.data.data.post,
              comments: res.data.data.post.comments,
            });
          }
        })
        .catch(err => this.setState({ errorMessage: 'Post Not Found!' }));
    }
  }

  removeCommentFromState = (id) => {
    const { comments } = this.state;
    const commentsAfterDeletedComment = comments.filter(comment => comment._id !== id);
    this.setState({ comments: commentsAfterDeletedComment });
  }

  updateCommentText = (idx, commentId, commentText) => {
    const { comments } = this.state;
    const tempComment = [...comments];
    let index = idx;
    if (tempComment[index]._id !== commentId) {
      index = tempComment.findIndex(commentObj => commentObj._id === commentId);
    }
    tempComment[index].comment = commentText;
    this.setState({ comments: tempComment });
  }

  submitComment = (commentText) => {
    const { _id: submittedPostId } = this.state.post;
    const tempCommnetObj = {
      author: {
        username: this.props.userData.username,
        imgSrc: this.props.userData.imgSrc,
      },
      comment: commentText,
      _id: 1,
      likes: [],
      userComment: true,
    };
    this.setState(prevState => ({
      comments: [...prevState.comments, tempCommnetObj],
    }));
    axios({
      method: 'post',
      url: `https://calm-waters-47062.herokuapp.com/posts/${submittedPostId}/comments`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('cb-token')}`,
      },
      data: {
        comment: commentText,
      },
    })
      .then((res) => {
        if (res.data.success) {
          this.setState({ comments: res.data.data.comments });
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    const { post } = this.state;
    const { comments } = this.state;
    return (
      <div className="postDetails">
        <div className="container">
          {Object.entries(post).length !== 0 ? (
            <React.Fragment>
              <Card post={post} />
              <div className="postDetails--commets">
                {comments && comments.map((comment, idx) => (
                  <Comment
                    idx={idx}
                    commentItem={comment}
                    handleRemoveComment={this.removeCommentFromState}
                    handleUpdateComment={this.updateCommentText}
                    postId={post._id}
                  />
                ))}
              </div>
            </React.Fragment>
          ) : (
            <div>Loading</div>
            )}
        </div>
        <div className="postDetails--commentBox">
          <CommentBox submitComment={this.submitComment} />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  userData: state.user,
  postsData: state.posts,
});

PostDetails.propTypes = {
  location: PropTypes.oneOfType(Object).isRequired,
};

export default connect(
  mapStateToProps,
  null,
)(withRouter(PostDetails));
