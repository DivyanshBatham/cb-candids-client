import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllPosts } from '../../actions/postActions';
import UserCard from '../../components/UserCard';
import SearchBox from '../../components/SearchBox';
import CardRenderer from '../../components/CardRenderer';
import Navbar from '../../components/Navbar';
import './search.scss';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: null,
    };
  }
  componentDidMount() {
    if (this.props.postsData.posts.length > 0) { this.setState({ posts: this.props.postsData.posts }); }
    this.props.fetchAllPosts();
  }
  componentWillReceiveProps(nextProps) {
    const { postsData } = nextProps;
    if (postsData.posts.length > 0) {
      this.setState({ posts: postsData.posts });
    }
  }
  render() {
    const { posts } = this.state;
    const arr = [1, 2, 3, 4];
    return (
      <React.Fragment>
        <Navbar />
        <div className="container search">
          <SearchBox />
          <h2 className="sectionHeading">Users</h2>
          <div className="search__userList">
            {arr.map(user => (
              <div className="search__userList__user">
                {' '}
                <UserCard user={user} />
              </div>
            ))}
          </div>
          <span className="search__userViewText">View all Results</span>
          <h2 className="sectionHeading">Moments</h2>
          <CardRenderer posts={posts} />
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    postsData: state.posts,
  };
}

export default connect(
  mapStateToProps,
  { fetchAllPosts },
)(Search);
