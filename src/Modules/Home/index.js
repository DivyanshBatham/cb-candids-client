import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAllPosts } from '../../actions/postActions';
import CardRenderer from '../../components/CardRenderer';
import './home.scss';

class Home extends Component {
  constructor() {
    super();
    this.state = {
    };
  }
  componentDidMount() {
    // if there is posts in the state then show it fetch it in the background.
    if (this.props.stateData.posts.length < 1) {
      this.props.fetchAllPosts();
    }
  }
  render() {
    const { posts } = this.props.stateData;
    return <span className="home"><CardRenderer posts={posts} /></span>;
  }
}

function mapStateToProps(state) {
  return {
    stateData: state,
  };
}
Home.propTypes = {
  stateData: PropTypes.shape({
    posts: PropTypes.array.isRequired,
  }).isRequired,
  fetchAllPosts: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { fetchAllPosts })(Home);
