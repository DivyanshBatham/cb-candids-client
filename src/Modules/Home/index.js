import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllPosts } from '../../actions/postActions';
import CardRenderer from '../../components/CardRenderer';
import './home.scss';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
    };
  }
  componentDidMount() {
    this.props.fetchAllPosts();
  }
  render() {
    const { posts } = this.props.stateData;
    console.log('in home redux store-->', this.props.stateData);
    return <span className="home"><CardRenderer posts={posts} /></span>;
  }
}

function mapStateToProps(state) {
  return {
    stateData: state,
  };
}

export default connect(mapStateToProps, { fetchAllPosts })(Home);
