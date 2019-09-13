import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PumpkinLogo from '../../assets/pumpkin';
import nameLogo from '../../assets/name';
import { currentPage } from '../../helpers';
import './navbar.scss';

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      optionIconClicked: false
    };
  }
  findCurrentPage = pathname => {
    const currentPage = pathname === '/' ? 'home' : 'otherPage';
    // pathname.contains('post)  ---> post
    // pathname.contains('user) ---> user??
    return currentPage;
  };
  handleGoBack = e => {
    e.preventDefault();
    this.props.history.goBack();
  };
  handleOptions = e => {
    e.preventDefault();
  };
  render() {
    console.log('props is-->', this.props.location.pathname);
    const { pathname } = this.props.location;
    const page = this.findCurrentPage(pathname);
    let display;
    if (window.location.pathname.indexOf('/post') !== -1) {
      display = true;
    } else display = currentPage(window.location.pathname);
    return (
      <div className={`navbar ${display ? '' : ' hide'}`}>
        {/* when '/'--> icon and name
          when '/post/:id' --> back button logo name verticleOption
          when '/user/:username'----> back button logo name verticleOption */}
        <div className="navbar__backLogo">
          {page !== 'home' ? (
            <FontAwesomeIcon
              icon="angle-left"
              className="navbar__backLogo__icon"
              onClick={this.handleGoBack}
            />
          ) : (
            ''
          )}
        </div>
        <div className="navbar__logo">
          <Link to="/" className="navbar__logo__link">
            <div className="navbar__logo__pumpkin">{PumpkinLogo}</div>
            <div className="navbar__logo__name">{nameLogo}</div>
          </Link>
        </div>
        <div className="navbar__optionLogo">
          {page !== 'home' ? (
            <FontAwesomeIcon
              icon="ellipsis-v"
              className="navbar__optionLogo__icon"
              onClick={this.handleOptions}
            />
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Navbar);
