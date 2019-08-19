import React, { Component } from 'react';
import './navbar.scss';

class Navbar extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div className="navbar">
        <div>Icon-cb</div>
        <div>Name-cb</div>
        <div>Logo-Image</div>
      </div>
    );
  }
}

export default Navbar;
