import React, { Component } from 'react';
import './tag.scss';

class Tag extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleTag = (e) => {
    e.preventDefault();
    // TODO: redirect to user page
  };
  render() {
    const { name } = this.props;
    return (
      <span className="tag" onClick={this.handleTag}>
        {name}
      </span>
    );
  }
}

export default Tag;
