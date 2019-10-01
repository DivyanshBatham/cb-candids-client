import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { deletePost } from '../../actions/postActions';
import { toggleShareMenu } from '../../actions/shareAction';
import './card.scss';
import Tag from '../Tag';
import DropdownOptions from '../DropdownOptions';
import ConfirmationModal from '../ConfirmationModal';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDescription: false,
      likesCount: props.post.likes.length,
      liked: this.isLiked(),
      showConfirmationModal: false,
      showLoader: false,
    };
  }

  isLiked = () => {
    const currentUser = localStorage.getItem('cb-username');
    const likedArray = this.props.post.likes;
    return (
      likedArray.filter(item => currentUser === item.username).length > 0
    );
  };
  handleLikes = (e) => {
    e.preventDefault();
    const extraPoint = this.state.liked ? -1 : 1;
    this.setState(prevState => ({
      likesCount: prevState.likesCount + extraPoint,
      liked: !prevState.liked,
    }));
    axios({
      method: 'post',
      url: `https://calm-waters-47062.herokuapp.com/posts/${this.props.post._id}/likes`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('cb-token')}`,
      },
    })
      .then((res) => {
        if (!res.data.success) {
          this.setState(prevState => ({
            likesCount: prevState.likesCount + -1 * extraPoint,
            liked: extraPoint === -1,
          }));
        }
      })
      .catch(() =>
        this.setState(prevState => ({
          likesCount: prevState.likesCount + -1 * extraPoint,
          liked: extraPoint === -1,
        })));
  };
  handleDescription = (e) => {
    e.preventDefault();
    this.setState(prevState => ({
      openDescription: !prevState.openDescription,
    }));
  };
  handleAuthorRedirect = (e) => {
    e.preventDefault();
    const { author } = this.props.post;
    this.props.history.push(`/user/${author.username}`);
  };
  handlePostRedirect = (e) => {
    e.preventDefault();
    const { post } = this.props;
    const { _id: id } = post;
    // this.props.history.push(`/post/${id}`, { ...post });
    this.props.history.push(`/post/${id}`);
  };
  handleShowOption = (e) => {
    e.preventDefault();
    this.setState(prevState => ({
      showOption: !prevState.showOption,
    }));
  };
  handleEditPost = () => {
    const { post } = this.props;
    const { _id: id } = post;
    this.props.history.push(`/editPost/${id}`, { ...post });
  };
  handleShowConfirmation = () => {
    this.setState(prevState => ({
      showConfirmationModal: !prevState.showConfirmationModal,
    }));
  };
  handleDeletePost = (e) => {
    e.preventDefault();
    // TODO: ADD some logic for card to disable the buttons
    const { _id: postId } = this.props.post;
    this.props.deletePost(postId);
  };
  checkLoginAuthor = () => {
    const { author } = this.props.post;
    return this.props.stateData.user.username === author.username;
  };
  shareLink = (e) => {
    e.preventDefault();
    const title = 'Share the candid moment';
    let url = window.location.href;
    url = url.split('/');
    url = `${url[0]}//${url[2]}/post/${this.props.post._id}`;
    this.props.toggleShareMenu(title, url);
  };
  render() {
    const {
      openDescription,
      liked,
      likesCount,
      showOption,
      showConfirmationModal,
    } = this.state;
    const {
      title,
      description,
      author,
      comments,
      imgSrc,
      taggedUsers,
    } = this.props.post;
    return (
      <div className="card">
        {showConfirmationModal && (
          <ConfirmationModal
            headerText="Delete Candid?"
            description="You will lost a good moment !"
            dangerButtonText="Yes, Delete Candid"
            cancelButtonText="No, Keep Candid"
            dangerButtonHandler={this.handleDeletePost}
            cancelButtonHandler={this.handleShowConfirmation}
          />
        )}
        <div className="card--titleWrapper">
          <span className="card--titleWrapper--title">{title}</span>
          <DropdownOptions
            iconProps={{ fontSize: '1rem' }}
            options={[
              {
                title: this.checkLoginAuthor() ? 'Edit Candid' : null,
                handleClick: this.handleEditPost,
              },
              {
                title: this.checkLoginAuthor() ? 'Delete Candid' : null,
                handleClick: this.handleShowConfirmation,
              },
              {
                title: 'Share Candid',
                handleClick: this.shareLink,
              },
            ]}
          />
        </div>
        <span
          className={
            openDescription
              ? 'card--description card--openDescription'
              : 'card--description'
          }
          role="button"
          tabIndex={0}
          onKeyDown={this.handleDescription}
          onClick={this.handleDescription}
        >
          {description}
        </span>
        <div className="card--tag">
          {taggedUsers.map((taggedUser, idx) => (
            <Tag name={taggedUser.username} key={taggedUser._id} idx={idx} />
          ))}
        </div>
        <img className="card--image" src={imgSrc} alt="post" />
        <div className="card--footer">
          <div className="card--footer--stats">
            <div className="card--footer--stats--item">
              <FontAwesomeIcon
                onClick={this.handleLikes}
                icon={[`${liked ? 'fas' : 'far'}`, 'heart']}
                className={`card--footer--stats--item--icon ${liked &&
                  'card--footer--stats--item--icon--liked'}`}
              />
              <span className="card--footer--stats--item--text">
                {likesCount}
              </span>
            </div>
            <div className="card--footer--stats--item">
              <FontAwesomeIcon
                onClick={this.handlePostRedirect}
                icon={['far', 'comment']}
                className="card--footer--stats--item--icon"
              />
              <span className="card--footer--stats--item--text">
                {comments.length}
              </span>
            </div>
          </div>
          <div
            className="card--footer--authorDetails"
            onClick={this.handleAuthorRedirect}
            role="button"
            tabIndex={-1}
            onKeyDown={this.handleAuthorRedirect}
          >
            <span className="card--footer--authorDetails--text">
              {author.username}
            </span>
            <img
              className="card--footer--authorDetails--image"
              src={author.imgSrc}
              alt="author"
            />
          </div>
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    author: PropTypes.object.isRequired,
    likes: PropTypes.array.isRequired,
    comments: PropTypes.array.isRequired,
    imgSrc: PropTypes.string.isRequired,
    taggedUsers: PropTypes.array.isRequired,
    history: PropTypes.oneOfType([
      PropTypes.object,
    ]),
  }),
  deletePost: PropTypes.func.isRequired,
  toggleShareMenu: PropTypes.func.isRequired,
};

Card.defaultProps = {
  post: {},
};

const mapStateToProps = state => ({ stateData: state });

export default connect(
  mapStateToProps,
  { deletePost, toggleShareMenu },
)(withRouter(Card));
