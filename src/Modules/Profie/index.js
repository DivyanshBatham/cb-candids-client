import React, { Component } from 'react';
import axios from 'axios';
import TextareaAutosize from 'react-textarea-autosize';
import CardRenderer from '../../components/CardRenderer';
import './profile.scss';
import Loader from '../../components/Loader';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      data: '',
      errors: null,
      loading: true,
      editUserDetails: false,
      username: '',
      bio: '',
    };
  }
  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate(prevProps) {
    const { username: currentUserName } = this.props.match.params;
    const { username: previousUserName } = prevProps.match.params;
    if (currentUserName !== previousUserName) this.fetchData();
  }
  // handler for editing the user profile details
  handleEditProfile = (e) => {
    e.preventDefault();
    this.setState({ editUserDetails: true });
    this.textarea.focus();
  };

  handleStateData = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };
  fetchData = () => {
    const { username } = this.props.match.params;
    axios({
      method: 'get',
      url: `https://calm-waters-47062.herokuapp.com/users/${username}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('cb-token')}`,
      },
    })
      .then((res) => {
        if (res.data.success) {
          this.setState({
            data: res.data.data,
            loading: false,
            username: res.data.data.user.username,
            bio: res.data.data.user.bio,
          });
        }
      })
      .catch((err) => {
        this.setState({
          errors: err.response.data.errors,
          loading: false,
        });
      });
  };
  render() {
    const {
      errors, loading, editUserDetails, username, bio,
    } = this.state;
    const {
      likeCount, postCount, posts, user,
    } = this.state.data;
    return (
      <React.Fragment>
        {loading ? (
          <Loader />
        ) : (
          <React.Fragment>
            {errors ? (
              <div className="error">{errors}</div>
            ) : (
              <div className="profile">
                <div
                  className="profile__imageContainer"
                  style={{
                    backgroundImage: `url(${user && user.imgSrcLarge})`,
                  }}
                />
                <TextareaAutosize
                  className="profile__username profile__editBox"
                  value={username}
                  readOnly={!editUserDetails}
                  placeholder="Enter username"
                  name="username"
                  onChange={this.handleStateData}
                  inputRef={tag => (this.textarea = tag)}
                />
                <TextareaAutosize
                  className="profile__bio profile__editBox"
                  value={bio}
                  placeholder="write your bio"
                  readOnly={!editUserDetails}
                  name="bio"
                  onChange={this.handleStateData}
                />
                <h2 className="sectionHeading profile__heading">Stats</h2>
                <div className="profile__stats">
                  <div className="profile__stats__item">
                    <span className="profile__stats__item__number">
                      {postCount}
                    </span>
                    <span className="profile__stats__item__text">POSTS</span>
                  </div>
                  <div className="profile__stats__item">
                    <span className="profile__stats__item__number">
                      {likeCount}
                    </span>
                    <span className="profile__stats__item__text">LIKES</span>
                  </div>
                  <div className="profile__stats__item">
                    <span className="profile__stats__item__number">10</span>
                    <span className="profile__stats__item__text">PHOTOS</span>
                  </div>
                </div>
                <h2 className="sectionHeading profile__heading">Candids</h2>
                {posts && posts.length > 0 ? (
                  <CardRenderer posts={posts} />
                ) : (
                  <div className="error">No post found</div>
                )}
              </div>
            )}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default Profile;
