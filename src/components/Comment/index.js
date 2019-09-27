import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-textarea-autosize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter } from 'react-router-dom';
import DropdownOptions from '../DropdownOptions';
import ConfirmationModal from '../ConfirmationModal';
import RandomColor from '../../helpers/RandomColor';
import './comment.scss';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showConfirmationModal: false,
      showCommentBox: false,
      commentText: '',
      isLiked: null,
    };
  }
  componentDidMount() {
    this.setState({
      commentText: this.props.commentItem.comment,
      isLiked: this.props.commentItem.isLiked,
    });
  }

  handleCopyComment = (e) => {
    e.preventDefault();
    const { commentText } = this.state;
    // TODO: copy is not working
    navigator.clipboard
      .writeText(commentText)
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
    this.textarea.focus();
  };

  handleShowConfirmation = () => {
    this.setState(prevState => ({
      showConfirmationModal: !prevState.showConfirmationModal,
    }));
  };
  handleCommentText = (e) => {
    e.preventDefault();
    this.setState({ commentText: e.target.value });
  };
  handleCancleComment = (e) => {
    e.preventDefault();
    this.handleShowCommentBox(e);
    this.setState({ commentText: this.props.commentItem.comment });
  };
  handleEditComment = (e) => {
    e.preventDefault();
    const {
      postId, commentItem, handleUpdateCommentOrLike, idx,
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
    })
      .then((res) => {
        if (res.data.success) {
          handleUpdateCommentOrLike(idx, commentItem._id, {
            type: 'comment',
            value: commentText,
          });
        }
      })
      .catch(err => console.log(err));
  };
  handleCommentLike = (e) => {
    const { isLiked: currentLikedState } = this.state;
    e.preventDefault();
    const {
      postId, commentItem, handleUpdateCommentOrLike, idx,
    } = this.props;
    this.setState(prevState => ({
      isLiked: !prevState.isLiked,
    }));
    axios({
      method: 'post',
      url: `https://calm-waters-47062.herokuapp.com/posts/${postId}/comments/${commentItem._id}/likes`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('cb-token')}`,
      },
    })
      .then((res) => {
        if (res.data.success) {
          this.setState({ isLiked: res.data.message === 'liked' }, () => {
            handleUpdateCommentOrLike(idx, commentItem._id, {
              type: 'like',
              value: this.state.isLiked,
            });
          });
        }
      })
      .catch(() => this.setState({ isLiked: currentLikedState }));
  };
  handleAuthorRedirect = (e) => {
    e.preventDefault();
    this.props.history.push(`/user/${this.props.commentItem.author.username}`);
  };
  render() {
    const {
      showConfirmationModal,
      showCommentBox,
      commentText,
      isLiked,
    } = this.state;
    const postedTime = '15 mins';
    const { commentItem } = this.props;
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
          role="button"
          tabIndex={0}
          onKeyDown={this.handleAuthorRedirect}
          onClick={this.handleAuthorRedirect}
        />
        <div className="comment__content" style={{ backgroundColor: `${RandomColor.getLightColorGuaranteed()}` }}>
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
              <div className="comment__content__header__iconWrapper">
                {!showCommentBox && (
                  <div
                    className={`comment__content__header__iconWrapper__likeIcon iconContainer ${
                      isLiked
                        ? 'comment__content__header__iconWrapper__likeIcon__liked'
                        : ''
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={[`${isLiked ? 'fas' : 'far'}`, 'heart']}
                      onClick={this.handleCommentLike}
                    />
                    {/* <span>{commentItem.likes.length}</span> */}
                  </div>
                )}
                <DropdownOptions
                  options={[
                    {
                      title: 'Copy',
                      handleClick: this.handleCopyComment,
                    },
                    {
                      title: commentItem.isAuthor ? 'Edit' : null,
                      handleClick: this.handleShowCommentBox,
                    },
                    {
                      title: commentItem.isAuthor ? 'Delete' : null,
                      handleClick: this.handleShowConfirmation,
                    },
                  ]}
                />
              </div>
            )}
          </div>
          <TextareaAutosize
            className="comment__content__input"
            onChange={this.handleCommentText}
            value={commentText}
            readOnly={!showCommentBox}
            inputRef={tag => (this.textarea = tag)}
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
  handleUpdateCommentOrLike: PropTypes.func.isRequired,
};
export default withRouter(Comment);
