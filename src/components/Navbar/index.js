import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PumpkinLogo from '../../assets/pumpkin';
import nameLogo from '../../assets/name';
import './navbar.scss';

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      optionIconClicked:false,
    };
  }
  findCurrentPage = (pathname) => {
    const currentPage = pathname === '/' ? 'home' : 'otherPage';
    // pathname.contains('post)  ---> post
    // pathname.contains('user) ---> user??
    return currentPage;
  };
  handleGoBack = (e) => {
    e.preventDefault();
    this.props.history.goBack();
  }
  handleOptions = (e) => {
    e.preventDefault();
  }
  render() {
    console.log('props is-->', this.props.location.pathname);
    const { pathname } = this.props.location;
    const currentPage = this.findCurrentPage(pathname);
    console.log(currentPage);
    return (
      <div className="navbar">
        {/* when '/'--> icon and name
          when '/post/:id' --> back button logo name verticleOption
          when '/user/:username'----> back button logo name verticleOption */}
        <div className="navbar__backLogo">
          {currentPage !== 'home' ? (
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
          <div className="navbar__logo__pumpkin">{PumpkinLogo}</div>
          <div className="navbar__logo__name">{nameLogo}</div>
        </div>
        <div className="navbar__optionLogo">
          {currentPage !== 'home' ? (
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
