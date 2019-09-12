import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { getBackgroundColor } from '../../helpers';
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
  getBackgroundColor = () => {
    const { idx } = this.props;
    const availableColors = ['3FBF3E1', '#FAEEE1', '#F3F9EC', '#FDE8EF'];
    const totalColors = availableColors.length;
    return { backgroundColor: availableColors[idx % totalColors] };
  };
  render() {
    const { name, idx } = this.props;
    return (
      <span
        className="tag"
        onClick={this.handleTag}
        style={getBackgroundColor(idx)}
      >
        {name}
      </span>
    );
  }
}

export default withRouter(Tag);
