/* eslint-disable no-bitwise */
/* eslint-disable no-param-reassign */
import React, { Component } from 'react';
import './commentBox.scss';

class CommentBox extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      rows: 1,
      minRows: 1,
      maxRows: 5,
    };
  }

  // REFERENCE = https://codepen.io/Libor_G/pen/eyzwOx
  handleValue = (event) => {
    const textareaLineHeight = 18;
    const { minRows, maxRows } = this.state;

    const previousRows = event.target.rows;
    event.target.rows = minRows; // reset number of rows in textarea

    const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);

    if (currentRows === previousRows) {
      event.target.rows = currentRows;
    }

    if (currentRows >= maxRows) {
      event.target.rows = maxRows;
      event.target.scrollTop = event.target.scrollHeight;
    }

    this.setState({
      value: event.target.value,
      rows: currentRows < maxRows ? currentRows : maxRows
    });
  };

  render() {
    const userImage =
      'https://avatars0.githubusercontent.com/u/29652551?s=460&v=4';
    const { rows, value } = this.state;
    return (
      <form className="commentBox">
        <img className="commentBox--image" src={userImage} alt="user" />
        <textarea
          rows={rows}
          value={value}
          onChange={this.handleValue}
          className="commentBox--input"
          type="text"
          placeholder="Add a comment..."
        />
        <span className="commentBox--button">Post</span>
      </form>
    );
  }
}

export default CommentBox;
