import React, { Component } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
    this.setState({ value: '' });
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
        {
          userData.imgSrc ?
            <img className="commentBox--image" src={userData.imgSrc} alt="user" />
          :
            <div className="commentBox--image commentBox__border" />

        }
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
CommentBox.propTypes = {
  submitComment: PropTypes.func.isRequired,
  userData: PropTypes.shape({}).isRequired,
};

export default connect(mapStateToProps, null)(CommentBox);
