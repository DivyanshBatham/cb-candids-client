import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import CardRenderer from '../../components/CardRenderer';
import './profile.scss';
import Loader from '../../components/Loader';
import Navbar from '../../components/Navbar';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      errors: null,
      loading: true,
    };
  }
  componentDidMount() {
    this.fetchData();
    // this.setState({ loading: true });
  }
  componentDidUpdate(prevProps) {
    const { username: currentUserName } = this.props.match.params;
    const { username: previousUserName } = prevProps.match.params;
    if (currentUserName !== previousUserName) this.fetchData();
  }

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
    const othersProfile = this.props.userData.username !== this.props.match.params.username;

    return (
      <React.Fragment>
        <Navbar showBackIcon={othersProfile} />
        {loading ? (
          <Loader />
        ) : (
          <React.Fragment>
            {errors ? (
              <div className="error">{errors}</div>
              ) :
                (
                  <div className="profile">
                    <div className="profile--user">
                      <div
                        className="profile--user--imageContainer"
                        style={{ backgroundImage: `url(${user && user.imgSrcLarge})` }}
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

const mapStateToProps = state => ({ userData: state.user });

export default connect(mapStateToProps, null)(Profile);
