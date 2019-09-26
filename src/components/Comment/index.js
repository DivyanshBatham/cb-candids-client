import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DropdownOptions from '../DropdownOptions';
import ConfirmationModal from '../ConfirmationModal';
import { getBackgroundColor } from '../../helpers';
import './comment.scss';
import CommentBox from '../CommentBox';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showConfirmationModal: false,
      showCommentBox: false,
      commentText: '',
    };
  }
  componentDidMount() {
    console.log('component mounted');
    this.setState({ commentText: this.props.commentItem.comment });
  }

  handleCopyComment = (e) => {
    e.preventDefault();
    const { commentItem } = this.props;
    navigator.clipboard
      .writeText(commentItem.comment)
      .then(() => {
        // TODO: show something for text copied
      })
      .catch(err => console.log(err));
  };

  handleDeleteComment = () => {
    const { postId, commentItem, handleRemoveComment } = this.props;
    axios({
      method: 'delete',
      url: `https://calm-waters-47062.herokuapp.com/posts/${postId}/comments/${commentItem._id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('cb-token')}`,
      },
    })
      .then((res) => {
        if (res.data.success) {
          handleRemoveComment(commentItem._id);
          this.setState({ showConfirmationModal: false });
        }
      })
      .catch(err => console.log(err));
  };

  handleShowCommentBox = (e) => {
    e.preventDefault();
    this.setState(prevState => ({
      showCommentBox: !prevState.showCommentBox,
    }));
    // this.nameInput.focus();
  };

  handleShowConfirmation = () => {
    this.setState(prevState => ({
      showConfirmationModal: !prevState.showConfirmationModal,
    }));
  };
  handleCommentText = (e) => {
    e.preventDefault();
    this.setState({ commentText: e.target.value });
  }
  handleCancleComment = (e) => {
    e.preventDefault();
    this.handleShowCommentBox(e);
    this.setState({ commentText: this.props.commentItem.comment });
  }
  handleEditComment = (e) => {
    e.preventDefault();
    const {
      postId, commentItem, handleUpdateComment, idx,
    } = this.props;
    const { commentText } = this.state;
    if (commentText === commentItem.comment) return;
    this.handleShowCommentBox(e);
    axios({
      method: 'patch',
      url: `https://calm-waters-47062.herokuapp.com/posts/${postId}/comments/${commentItem._id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('cb-token')}`,
      },
      data: {
        comment: commentText,
      },
    }).then((res) => {
      if (res.data.success) {
        handleUpdateComment(idx, commentItem._id, commentText);
      }
    }).catch(err => console.log(err));
  }
  render() {
    const { showConfirmationModal, showCommentBox, commentText } = this.state;
    const postedTime = '15 mins';
    const { idx, commentItem } = this.props;
    const randomColorValue = getBackgroundColor(idx);
    return (
      <div
        className={commentItem.isAuthor ? 'comment comment--self' : 'comment'}
      >
        {showConfirmationModal && (
          <ConfirmationModal
            headerText="Delete Comment?"
            description="You will lost a good thought !"
            dangerButtonText="Yes, Delete!"
            cancelButtonText="No, Keep Comment"
            dangerButtonHandler={this.handleDeleteComment}
            cancelButtonHandler={this.handleShowConfirmation}
          />
        )}
        <img
          className={
            commentItem.isAuthor
              ? 'comment__image comment__image--self'
              : 'comment__image'
          }
          src={commentItem.author.imgSrc}
          alt="user"
        />
        <div className="comment__content" style={randomColorValue}>
          <div className="comment__content__header">
            <span className="comment__content__header__username">
              {showCommentBox ? 'Edit Comment' : commentItem.author.username}
            </span>
            {showCommentBox ? (
              <span className="comment__content__icons">
                <div className="comment__content__icons__iconContainer iconContainer">
                  <FontAwesomeIcon
                    icon="times"
                    onClick={this.handleCancleComment}
                  />
                </div>
                <div className="comment__content__icons__iconContainer iconContainer">
                  <FontAwesomeIcon
                    icon="check"
                    onClick={this.handleEditComment}
                  />
                </div>
              </span>
            ) : (
              <DropdownOptions
                options={[
                  {
                    title: 'Copy',
                    handleClick: this.handleCopyComment,
                  },
                  {
                    // title: commentItem.isAuthor ? 'Edit' : null,
                    title: 'Edit',
                    handleClick: this.handleShowCommentBox,
                  },
                  {
                    title: commentItem.isAuthor ? 'Delete' : null,
                    handleClick: this.handleShowConfirmation,
                  },
                ]}
              />
            )}
          </div>
          {/* <span className="comment__content__text">{commentItem.comment}</span> */}
          <input
            className="comment__content__input"
            onChange={this.handleCommentText}
            style={randomColorValue}
            value={commentText}
            disabled={!showCommentBox}
            ref={input => input && input.focus()}
          />
          <span className="comment__content__time">{postedTime} ago</span>
        </div>
      </div>
    );
  }
}

Comment.propTypes = {
  idx: PropTypes.number.isRequired,
  commentItem: PropTypes.shape({}).isRequired,
  postId: PropTypes.string.isRequired,
  handleRemoveComment: PropTypes.func.isRequired,
  handleUpdateComment: PropTypes.func.isRequired,
};
export default Comment;
