import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './searchBox.scss';

class SearchBox extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      showOptions: false,
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
      this.setState({ showOptions: false });
    }
  };

  handleSetTextToState = (e) => {
    this.setState({ value: e.target.value, showOptions: true });
  };
  handleSelectOption = (selectedOption) => {
    this.setState({ showOptions: false });
    this.props.handleSearch({ ...selectedOption });
  };
  handleEnter = (e, cbFunction) => {
    if (e.key === 'Enter') {
      cbFunction(e);
    }
  };
  handleEscPress = (e) => {
    if (e.key === 'Escape') {
      this.setState({ showOptions: false });
    }
  }
  render() {
    const { value, showOptions } = this.state;
    return (
      <div className="searchBox">
        <input
          placeholder="Search"
          className="searchBox__input"
          onChange={this.handleSetTextToState}
          value={value}
          onKeyDown={this.handleEscPress}

        />
        <FontAwesomeIcon icon="search" className="searchBox__icon" />
        {value && showOptions && (
          <div
            className="searchBox__optionsList"
            ref={this.setWrapperRef}
          >
            <div className="searchBox__optionsList__options">
              <span
                className="searchBox__optionsList__options__option"
                tabIndex={0}
                role="button"
                onClick={() => this.handleSelectOption({ value, type: 'user' })}
                onKeyDown={e =>
                  this.handleEnter(e, () =>
                    this.handleSelectOption({ value, type: 'user' }))
                }
              >
                {`Search for user '${value}'`}
              </span>
              <span
                className="searchBox__optionsList__options__option"
                tabIndex={0}
                role="button"
                onClick={() => this.handleSelectOption({ value, type: 'tag' })}
                onKeyDown={e =>
                  this.handleEnter(e, () =>
                    this.handleSelectOption({ value, type: 'tag' }))
                }
              >
                {`Search for tagged User '${value}'`}
              </span>
              <span
                className="searchBox__optionsList__options__option"
                tabIndex={0}
                role="button"
                onClick={() => this.handleSelectOption({ value, type: 'post' })}
                onKeyDown={e =>
                  this.handleEnter(e, () =>
                    this.handleSelectOption({ value, type: 'post' }))
                }
              >
                {`Search for Post '${value}'`}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default SearchBox;
