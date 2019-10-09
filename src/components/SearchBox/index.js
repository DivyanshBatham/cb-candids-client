import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './searchBox.scss';

const SearchBox = props => (
  <div className="searchBox">
    <input placeholder="Search" className="searchBox__input" />
    <FontAwesomeIcon
      icon="search"
      className="searchBox__icon"
    />
  </div>
);
export default SearchBox;
