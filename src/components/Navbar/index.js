import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PumpkinLogo from '../../assets/pumpkin';
import nameLogo from '../../assets/name';
import './navbar.scss';

class Navbar extends Component {
  constructor() {
    super();
    this.state = {};
  }
  findCurrentPage = (pathname) => {
    const currentPage = pathname === '/' ? 'home' : 'otherPage';
    // currentPage = currentPage === 'otherPage' ?
    // pathname.contains('post)  ---> post
    // pathname.contains('user) ---> user??
    return currentPage;
  };
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
        <div className="navbar__logo">
        <div>
          {
            currentPage !== 'home' ? 'backArrow' : ''
          }
        </div>
        <div className="navbar__logo__pumpkin">{PumpkinLogo}</div>
        <div className="navbar__logo__name">{nameLogo}</div>
        </div>
        <div>
          {
            currentPage !== 'home' ? 'threeDot' : ''
          }
        </div>
      </div>
    );
  }
}

export default withRouter(Navbar);
