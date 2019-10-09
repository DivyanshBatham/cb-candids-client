import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import TextareaAutosize from 'react-textarea-autosize';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toggleShareMenu } from '../../actions/shareAction';
import { logout } from '../../actions/logoutAction';
import CardRenderer from '../../components/CardRenderer';
import './profile.scss';
import Loader from '../../components/Loader';
import Navbar from '../../components/Navbar';
import Error from '../../components/Error';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      errors: null,
      loading: true,
      editingUserDetails: false,
      username: '',
      bio: '',
      imgSrc: null,
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

  fetchData = () => {
    const { username } = this.props.match.params;
    this.setState({
      errors: null,
      loading: true,
      editingUserDetails: false,
    }, () => {
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
              imgSrcDisplay: res.data.data.user.imgSrcLarge,
              imgSrc: null,
            });
          }
        })
        .catch((err) => {
          this.setState({
            errors: err.response.data.errors,
            loading: false,
          });
        });
    });
  };

  // handler for editing the user profile details
  toggleEditingAndReset = () => {
    this.setState(prevState => ({
      editingUserDetails: !prevState.editingUserDetails,
      username: prevState.data.user.username,
      bio: prevState.data.user.bio,
      imgSrc: null,
      imgSrcDisplay: prevState.data.user.imgSrcLarge,
    }), () => {
      if (this.state.editingUserDetails === true) {
        this.textarea.focus();
      }
    });
  };

  handleTextChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      this.setState({
        imgSrc: file,
        imgSrcDisplay: URL.createObjectURL(file),
      });
    }
  }

  handleSubmit = () => {
    const {
      bio, username, data: userData, imgSrc,
    } = this.state;
    const data = new FormData();
    data.append('bio', bio);
    if (imgSrc) data.append('imgSrc', imgSrc);
    data.append('username', username);
    axios({
      method: 'patch',
      url: 'https://calm-waters-47062.herokuapp.com/users',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('cb-token')}`,
        'Content-Type': 'multipart/form-data',
      },
      data,
    }).then((res) => {
      if (res.data.success) {
        localStorage.setItem('cb-username', username);
        this.setState({
          data: { ...userData, user: res.data.data },
          editingUserDetails: false,
          imgSrc: null,
          imgSrcDisplay: res.data.data.user.imgSrcLarge,
        });
      }
    }).catch(() => {
      this.toggleEditingAndReset();
    });
  }

  render() {
    const {
      errors, loading, editingUserDetails, username, bio,
      imgSrcDisplay,
    } = this.state;
    const { username: searcedUser } = this.props.match.params;

    const {
      likeCount, postCount, posts, user,
    } = this.state.data;
    const othersProfile =
      this.props.userData.username !== searcedUser;
    return (
      <React.Fragment>
        <Navbar
          showBackIcon={!loading && othersProfile && !editingUserDetails}
          showCrossIcon={editingUserDetails}
          handleCancel={this.toggleEditingAndReset}
          showCheckIcon={editingUserDetails}
          showOptionsIcon={!errors && !editingUserDetails}
          handleSubmit={this.handleSubmit}
          options={[
            {
              title: 'Share Profile',
              handleClick: () =>
                this.props.toggleShareMenu(
                  `Share ${username} Profile`,
                  window.location.href,
                ),
            },
            {
              title: othersProfile ? null : 'Edit Profile',
              handleClick: this.toggleEditingAndReset,
            },
            {
              title: othersProfile ? null : (
                <label htmlFor="pushNotification">
                  Notification
                  <input
                    type="radio"
                    name="pushNotification"
                    id="pushNotification"
                  />
                </label>
              ),
              handleClick: () => alert('Handle Push'),
            },
            {
              title: othersProfile ? null : 'Logout',
              handleClick: () => this.props.logout(),
            },
          ]}
        />
        {loading ? (
          <Loader />
        ) : (
          <React.Fragment>
            {errors ? (
              <Error error={errors} />
              ) : (
                <div className="profile">
                  <label
                    htmlFor="imgSrc"
                    className="profile__imageContainer"
                    style={{
                        backgroundImage: `url(${user && imgSrcDisplay})`,
                      }}
                  >
                    {editingUserDetails &&
                    <div className="profile__imageContainer__icon" >
                      <div className="iconContainer iconContainer--light">
                        <FontAwesomeIcon
                          icon="camera"
                        />
                      </div>
                    </div>
                      }
                    <input type="file" id="imgSrc" onChange={this.handleFileChange} disabled={!editingUserDetails} />
                  </label>
                  <TextareaAutosize
                    className="profile__username profile__editBox"
                    value={username}
                    readOnly={!editingUserDetails}
                    placeholder="Enter username"
                    name="username"
                    onChange={this.handleTextChange}
                    spellCheck="false"
                    inputRef={tag => (this.textarea = tag)}
                  />
                  <TextareaAutosize
                    className="profile__bio profile__editBox"
                    value={bio}
                    placeholder={editingUserDetails ? 'write your bio' : null}
                    readOnly={!editingUserDetails}
                    name="bio"
                    spellCheck="false"
                    onChange={this.handleTextChange}
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
                  <div className="container">
                    {posts && posts.length > 0 ? (
                      <CardRenderer posts={posts} />
                    ) : (
                      <div className="error">No post found</div>
                      )}
                  </div>
                </div>
                )}
          </React.Fragment>
          )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({ userData: state.user });

Profile.propTypes = {
  userData: PropTypes.shape({
    username: PropTypes.string,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      username: PropTypes.string,
    }),
  }).isRequired,
  toggleShareMenu: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  { toggleShareMenu, logout },
)(Profile);
