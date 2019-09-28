import React, { Component } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { connect } from 'react-redux';
import './commentBox.scss';

class CommentBox extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
    };
  }
  handleComment = (e) => {
    e.preventDefault();
    const { value } = this.state;
    if (value.length === 0) return;
    this.props.submitComment(value);
  };
  handleValue = (e) => {
    e.preventDefault();
    this.setState({ value: e.target.value });
  }
  render() {
    const { userData } = this.props;
    const { value } = this.state;
    return (
      <form className="commentBox" onSubmit={this.handleComment}>
        <img className="commentBox--image" src={userData.imgSrc} alt="user" />
        <TextareaAutosize
          maxRows={4}
          value={value}
          onChange={this.handleValue}
          className="commentBox--input"
          type="text"
          name="commentBox"
          placeholder="Add a comment..."
        />
        <span
          className="commentBox--button"
          role="button"
          tabIndex={0}
          onKeyDown={this.handleComment}
          onClick={this.handleComment}
        >
          Post
        </span>
      </form>
    );
  }
}
const mapStateToProps = state => ({
  userData: state.user,
});

export default connect(mapStateToProps, null)(CommentBox);
