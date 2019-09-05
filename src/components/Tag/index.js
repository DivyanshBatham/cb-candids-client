import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './tag.scss';

class Tag extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleTag = (e) => {
    e.preventDefault();
    const { name } = this.props;
    this.props.history.push(`/user/${name}`);
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

export default withRouter(Tag);
