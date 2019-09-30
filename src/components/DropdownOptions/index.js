import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import './dropdownOptions.scss';

class Options extends Component {
  constructor() {
    super();
    this.state = {
      displayOption: false,
    };
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
      this.setState({ displayOption: false });
    }
  };
  handleShowOption = (e) => {
    e.preventDefault();
    this.setState(prevState => ({
      displayOption: !prevState.displayOption,
    }));
  };

  render() {
    const { displayOption } = this.state;
    const { iconProps, children, lightIcon } = this.props;
    return (
      <div
        className={`dropdownOption iconContainer ${lightIcon ? ' iconContainer--light' : ''}`}
        ref={this.setWrapperRef}
      >
        <FontAwesomeIcon
          style={iconProps}
          icon="ellipsis-v"
          onClick={this.handleShowOption}
        />

        {displayOption && (
          <React.Fragment>
            <div className="dropdownOption__triangle" />
            <div className="dropdownOption__triangle dropdownOption__triangle--noShadow" />
            <div
              className={displayOption ? 'options' : 'hide'}
            // ref={this.setWrapperRef}
            >
              {this.props.options.map(option =>
                option.title && (
                  <div
                    className="options__option"
                    key={option.title}
                    onClick={option.handleClick}
                    role="button"
                    tabIndex={-2}
                    onKeyDown={this.handleAuthorRedirect}
                  >
                    {option.title}
                  </div>
                ))}
              {children && <div className="options__option">{children}</div>}
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

Options.propTypes = {
  iconProps: PropTypes.oneOfType(Object),
  options: PropTypes.oneOfType(Array),
  children: PropTypes.instanceOf(Element),
  lightIcon: PropTypes.bool,
};
Options.defaultProps = {
  iconProps: { fontSize: '1rem' },
  options: [],
  children: null,
  lightIcon: false,
};
export default Options;
