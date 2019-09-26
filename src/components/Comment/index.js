import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import DropdownOptions from '../DropdownOptions';
import ConfirmationModal from '../ConfirmationModal';
import { getBackgroundColor } from '../../helpers';
import './comment.scss';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showConfirmationModal: false,
    };
  }
  checkLoginAuthor = () => {
    const { authorDetails, commentItem } = this.props;
    return commentItem.author.username === authorDetails.username;
  };

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

  handleEditComment = (e) => {
    e.preventDefault();
    // TODO: do something for edit the comment
  };

  handleShowConfirmation = () => {
    this.setState(prevState => ({
      showConfirmationModal: !prevState.showConfirmationModal,
    }));
  };

  render() {
    const { showConfirmationModal } = this.state;
    const postedTime = '15 mins';
    const { userComment, idx, commentItem } = this.props;
    return (
      <div className={userComment ? 'comment comment--self' : 'comment'}>
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
            userComment
              ? 'comment__image comment__image--self'
              : 'comment__image'
          }
          src={commentItem.author.imgSrc}
          alt="user"
        />
        <div className="comment__content" style={getBackgroundColor(idx)}>
          <div className="comment__content__header">
            <span className="comment__content__header__username">
              {commentItem.author.username}
            </span>
            <DropdownOptions
              options={[
                {
                  title: 'Copy',
                  handleClick: this.handleCopyComment,
                },
                {
                  title: this.checkLoginAuthor() ? 'Edit' : null,
                  handleClick: this.handleEditComment,
                },
                {
                  title: this.checkLoginAuthor() ? 'Delete' : null,
                  handleClick: this.handleShowConfirmation,
                },
              ]}
            />
          </div>
          <span className="comment__content__text">{commentItem.comment}</span>
          <span className="comment__content__time">{postedTime} ago</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ authorDetails: state.user });

Comment.propTypes = {
  userComment: PropTypes.bool.isRequired,
  idx: PropTypes.number.isRequired,
  commentItem: PropTypes.shape({}).isRequired,
  postId: PropTypes.string.isRequired,
  authorDetails: PropTypes.shape({}).isRequired,
  handleRemoveComment: PropTypes.func.isRequired,
};
export default connect(
  mapStateToProps,
  null,
)(Comment);
