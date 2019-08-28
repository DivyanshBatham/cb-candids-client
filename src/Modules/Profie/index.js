import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CardRenderer from '../../components/CardRenderer';
import axios from 'axios';
import './profile.scss';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      errors: null
    };
  }
  componentDidMount() {
    const { username } = this.props.match.params;
    axios({
      method: 'get',
      url: `https://calm-waters-47062.herokuapp.com/users/${username}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('cb-token')}`
      }
    })
      .then(res => {
        if (res.data.success) {
          this.setState({ posts: res.data.data.posts });
        }
      })
      .catch(err => {
        this.setState({
          errors: err.response.data.errors
        });
      });
  }
  render() {
    console.log(this.state);
    console.log(this.props);
    const userImage =
      'https://avatars0.githubusercontent.com/u/29652551?s=460&v=4';
    const { username } = this.props.match.params;
    const { errors, posts } = this.state;
    const { author } = posts;
    const totalLikes = 100;
    const postsCount = 25;
    return (
      <React.Fragment>
        {errors ? (
          <div>{errors}</div>
        ) : (
          <div className="profile">
            <div className="profile--user">
              <img
                src={userImage}
                alt="user"
                className="profile--user--image"
              />
              <div className="profile--user--stats">
                <div className="profile--user--stats--item">
                  <span className="profile--user--stats--item--number">
                    {postsCount}
                  </span>
                  <span className="profile--user--stats--item--text">
                    POSTS
                  </span>
                </div>
                <div className="profile--user--stats--item">
                  <span className="profile--user--stats--item--number">
                    {totalLikes}
                  </span>
                  <span className="profile--user--stats--item--text">
                    LIKES
                  </span>
                </div>
              </div>
            </div>
            <div className="profile--details">
              <span className="profile--details--username">{username}</span>
              <span className="profile--details--bio">
                {
                author && author.bio
                  ? author.bio
                  : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
                }
              </span>
            </div>
            <div className="profile--postHeader">
              <div className="profile--postHeader--border">
                <span>POSTS</span>
              </div>
            </div>
            {posts.length > 0 ? (
              <CardRenderer posts={posts} />
            ) : (
              <div>No post found</div>
            )}
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Profile;
