import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter } from 'react-router-dom';
import './card.scss';
import axios from 'axios';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likesCount: props.post.likes.length,
      liked: this.isLiked(),
    };
  }
  isLiked = () => {
    const currentUser = localStorage.getItem('cb-username');
    const likedArray = this.props.post.likes;
    return likedArray.filter(item => currentUser === item.username).length > 0;
  };
  handleRedirectUserProfile = (e) => {
    e.preventDefault();
    console.log(this.props);
    const { author } = this.props.post;
    this.props.history.push({
      pathname: `/user/${author.username}`,
      state: { userData: author },
    });
    console.log(author);
  };
  handleRedirectPost = (e) => {
    e.preventDefault();
    this.props.history.push({
      pathname: `/post/${this.props.post._id}`,
      state: { post: this.props.post },
    });
  };
  handleLikePost = (e) => {
    e.preventDefault();
    this.setState(prevState => ({
      likesCount: prevState.likesCount + 1,
      liked: true,
    }));
    axios({
      method: 'post',
      url: `https://calm-waters-47062.herokuapp.com/posts/${
        this.props.post._id
      }/likes`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('cb-token')}`,
      },
    })
      .then((res) => {
        if (!res.data.success) {
          this.setState(prevState => ({
            likesCount: prevState.likesCount - 1,
            liked: false,
          }));
        } else {
          // TODO: Will show the error message
        }
      })

      .catch(err => console.log(err));
  };
  render() {
    console.log(this.props);
    const {
      author,
      imgSrc,
      title,
      description,
      comments,
      createdAt,
    } = this.props.post;
    console.log(this.state);
    const { likesCount, liked } = this.state;
    const userImage =
      'https://avatars0.githubusercontent.com/u/29652551?s=460&v=4';
    return (
      <div className="card">
        <div className="card--authorDetails">
          <img
            src={author.imgSrc || userImage}
            alt="user"
            onClick={this.handleRedirectUserProfile}
          />
          <h4
            className="card--authorDetails--authorName"
            onClick={this.handleRedirectUserProfile}
          >
            {author.username}
          </h4>
        </div>
        <img
          onClick={this.handleRedirectPost}
          className="card--postImage"
          src={imgSrc || userImage}
          alt="post"
        />
        <div className="card--postDetails">
          <h4 className="card--postDetails--title">{title}</h4>
          <p className="card--postDetails--description">{description}</p>
        </div>
        <div className="card--postStats">
          <div className="card--postStats--icons">
            <div className="card--postStats--icons--item">
              <FontAwesomeIcon
                icon={['far', 'comment']}
                className="card--postStats--icons--item--icon"
                onClick={this.handleRedirectPost}
              />
              <span className="card--postStats--icons--item--text">
                {comments.length}
              </span>
            </div>
            <div>
              <FontAwesomeIcon
                icon={['fas', 'heart']}
                className={`card--postStats--icons--item--icon ${liked && 'card--active'}`}
                onClick={this.handleLikePost}
              />
              <span className="card--postStats--icons--item--text">
                {likesCount}
              </span>
            </div>
          </div>
          <span>{createdAt || '15 min ago'}</span>
        </div>
      </div>
    );
  }
}

export default withRouter(Card);
