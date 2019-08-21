import React, { Component } from 'react';
import axios from 'axios';
import CardRenderer from '../../components/CardRenderer';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
    };
  }
  componentDidMount() {
    axios({
      method: 'get',
      url: 'https://calm-waters-47062.herokuapp.com/posts',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('cb-token')}`,
      },
    }).then((res) => {
      if (res.data.success) {
        this.setState({ posts: res.data.data.posts });
      }
    }).catch(err => console.log(err));
  }
  render() {
    const { posts } = this.state;
    return <CardRenderer posts={posts} />;
  }
}

export default Home;
