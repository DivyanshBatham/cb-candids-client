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
    this.props.fetchAllPosts();
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
  stateData: PropTypes.oneOfType(Object).isRequired,
  fetchAllPosts: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { fetchAllPosts })(Home);
