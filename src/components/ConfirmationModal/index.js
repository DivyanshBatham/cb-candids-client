import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './confirmationModal.scss';

class ConfirmationModal extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    document.addEventListener('click', this.handleClickOutsideOption);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutsideOption);
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  };
  handleClickOutsideOption = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.cancelButtonHandler();
    }
  };
  render() {
    const {
      headerText,
      description,
      dangerButtonText,
      cancelButtonText,
      dangerButtonHandler,
      cancelButtonHandler,
    } = this.props;
    return (
      <div className="confirmationModal">
        <div className="confirmationModal__content" ref={this.setWrapperRef}>
          <h4 className="confirmationModal__content__header">{headerText}</h4>
          <span className="confirmationModal__content__note">
            {description}
          </span>
          <div className="confirmationModal__content__buttons">
            <button
              className="confirmationModal__content__buttons__button confirmationModal__content__buttons__button--danger"
              onClick={dangerButtonHandler}
            >
              {dangerButtonText}
            </button>
            <button
              className="confirmationModal__content__buttons__button"
              onClick={cancelButtonHandler}
            >
              {cancelButtonText}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
ConfirmationModal.propTypes = {
  headerText: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  dangerButtonText: PropTypes.string.isRequired,
  cancelButtonText: PropTypes.string.isRequired,
  dangerButtonHandler: PropTypes.func.isRequired,
  cancelButtonHandler: PropTypes.func.isRequired,
};

export default ConfirmationModal;
