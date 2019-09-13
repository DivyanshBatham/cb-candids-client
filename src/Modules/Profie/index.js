import React, { Component } from 'react';
import axios from 'axios';
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
    };
  }
  componentDidMount() {
    const { username } = this.props.match.params;
    // this.setState({ loading: true });
    axios({
      method: 'get',
      url: `https://calm-waters-47062.herokuapp.com/users/${username}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('cb-token')}`,
      },
    })
      .then((res) => {
        console.log('in profile page-->', res.data.data);
        if (res.data.success) {
          this.setState({ data: res.data.data, loading: false });
        }
      })
      .catch((err) => {
        this.setState({
          errors: err.response.data.errors,
          loading: false,
        });
      });
  }
  render() {
    const { errors, loading } = this.state;
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
                <div className="profile--user">
                  <div
                    className="profile--user--imageContainer"
                    style={{ backgroundImage: `url(${user && user.imgSrc})` }}
                  />
                  <div className="profile--user--stats">
                    <div className="profile--user--stats--item">
                      <span className="profile--user--stats--item--number">
                        {postCount}
                      </span>
                      <span className="profile--user--stats--item--text">
                        POSTS
                      </span>
                    </div>
                    <div className="profile--user--stats--item">
                      <span className="profile--user--stats--item--number">
                        {likeCount}
                      </span>
                      <span className="profile--user--stats--item--text">
                        LIKES
                      </span>
                    </div>
                  </div>
                </div>
                <div className="profile--details">
                  <span className="profile--details--username">
                    {user && user.username}
                  </span>
                  <span className="profile--details--bio">
                    {user && user.bio}
                  </span>
                </div>
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
