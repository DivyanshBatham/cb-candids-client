import React, { Component } from 'react';
import Card from './Card';

class Home extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2];
    return (
      <div>
        {
          arr.map(() => <Card />)
        }
      </div>
    );
  }
}

export default Home;
