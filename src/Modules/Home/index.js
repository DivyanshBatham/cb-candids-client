import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAllPosts, updateNewPostInState } from '../../actions/postActions';
import CardRenderer from '../../components/CardRenderer';
import './home.scss';

class Home extends Component {
  constructor() {
    super();
    this.state = {
    };
  }
  componentDidMount() {
    this.props.fetchAllPosts();
  }
  handleNewPostData = (e) => {
    e.preventDefault();
    this.props.updateNewPostInState();
  }
  render() {
    const { posts, newDataAvailable } = this.props.postsData;
    return (
      <span className="home">
        {newDataAvailable && <button onClick={this.handleNewPostData} className="home__button" >new posts</button>}
        <CardRenderer posts={posts} />
      </span>
    );
  }
}

function mapStateToProps(state) {
  return {
    postsData: state.posts,
  };
}
Home.propTypes = {
  postsData: PropTypes.shape({
    posts: PropTypes.object.isRequired,
    newDataAvailable: PropTypes.bool.isRequired,
  }).isRequired,
  fetchAllPosts: PropTypes.func.isRequired,
  updateNewPostInState: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { fetchAllPosts, updateNewPostInState })(Home);
