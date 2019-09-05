import React, { Component } from 'react';
import Card from './Card';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { posts } = this.props;
    console.log(posts);
    return (
      <div className="container">
        {
          posts.map(post => <Card key={post._id} post={post} />)
        }
      </div>
    );
  }
}

export default Home;
