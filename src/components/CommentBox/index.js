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
  handleComment = (e) => {
    e.preventDefault();
    const { value } = this.state;
    if (value.length === 0) return;
    this.props.submitComment(value);
  };

  // handleKeyPress = (e) => {
  //   e.preventDefault();
  //   if (e.key === 'Enter') {
  //     this.handleComment(e);
  //   }
  // };

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
      rows: currentRows < maxRows ? currentRows : maxRows,
    });
  };

  render() {
    const userImage =
      'https://avatars0.githubusercontent.com/u/29652551?s=460&v=4';
    const { rows, value } = this.state;
    return (
      <form className="commentBox" onSubmit={this.handleComment}>
        <img className="commentBox--image" src={userImage} alt="user" />
        <textarea
          rows={rows}
          value={value}
          onChange={this.handleValue}
          className="commentBox--input"
          type="text"
          name="commentBox"
          placeholder="Add a comment..."
          // onKeyUp={this.handleKeyPress}
        />
        <span className="commentBox--button" onClick={this.handleComment}>
          Post
        </span>
      </form>
    );
  }
}

export default CommentBox;
