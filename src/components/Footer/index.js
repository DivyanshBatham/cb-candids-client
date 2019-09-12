import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './footer.scss';

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <span className="footer__items">
          <div className="test">
              <FontAwesomeIcon icon="home" className="footer__items__logo" />
          </div>
          <div className="test">
              <FontAwesomeIcon icon="search" className="footer__items__logo" />
          </div>
          <div className="test">
              <FontAwesomeIcon icon="plus-circle" className="footer__items__logo" />
          </div>
          <div className="test">
              <FontAwesomeIcon icon="bell" className="footer__items__logo" />
          </div>
          <div className="test">
              <FontAwesomeIcon icon="user" className="footer__items__logo" />
          </div>
        </span>
      </div>
    );
  }
}

export default Footer;
