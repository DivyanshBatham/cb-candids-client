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
    this.state = {
      post: this.props.location.state,
      comments: this.props.location.state && this.props.location.state.comments,
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
            this.setState({
              post: res.data.data.post,
              comments: res.data.data.post.comments,
            });
          }
        })
        .catch(err => this.setState({ errorMessage: 'Post Not Found!' }));
    }
  }
  isAuthorComment = (comment) => {
    const currentUser = this.props.userData.username;
    return comment.author.username === currentUser;
  };
  removeCommentFromState = (id) => {
    const { comments } = this.state;
    const commentsAfterDeletedComment = comments.filter(comment => comment._id !== id);
    this.setState({ comments: commentsAfterDeletedComment });
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
        // console.log('comment--->', res.data);
      })
      .catch(err => console.log(err));
  };

  render() {
    const { post } = this.state;
    const { comments } = this.state;
    return (
      <div className="postDetails">
        <div className="container">
          {post ? (
            <React.Fragment>
              <Card post={post} />
              <h2 className="sectionHeading">Conversation:</h2>
              <div className="postDetails--commets">
                {comments.map((comment, idx) => (
                  <Comment
                    idx={idx}
                    commentItem={comment}
                    userComment={this.isAuthorComment(comment)}
                    handleRemoveComment={this.removeCommentFromState}
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
const mapStateToProps = state => ({ userData: state.user });

PostDetails.propTypes = {
  location: PropTypes.oneOfType(Object).isRequired,
};

export default connect(
  mapStateToProps,
  null,
)(withRouter(PostDetails));
