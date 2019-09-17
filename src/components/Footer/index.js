import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter, NavLink } from 'react-router-dom';
import { currentPage, compareUser } from '../../helpers';
import './footer.scss';

class Footer extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    const currentProfileUserPath = window.location.pathname;
    const display = currentPage(currentProfileUserPath);
    const showFooter = compareUser(currentProfileUserPath);
    return (
      <div className={display && !showFooter ? 'footer' : ' hide'}>
        <span className="footer__items">
          <NavLink className="test" to="/" exact activeClassName="test--active">
            <FontAwesomeIcon
              icon="home"
              className={`footer__items__logo ${display ? '' : ' hide'}`}
              onClick={this.redirectHome}
            />
          </NavLink>
          <NavLink className="test" to="/search" activeClassName="test--active">
            <FontAwesomeIcon
              icon="search"
              className="footer__items__logo"
              onClick={this.redirectSearch}
            />
          </NavLink>
          <NavLink className="test" to="/upload" activeClassName="test--active">
            <FontAwesomeIcon
              icon="plus-circle"
              className="footer__items__logo"
            />
          </NavLink>
          <NavLink
            className="test"
            to="/notifications"
            activeClassName="test--active"
          >
            <FontAwesomeIcon
              icon="bell"
              className="footer__items__logo"
              onClick={this.redirectNotification}
            />
          </NavLink>
          <NavLink
            className="test"
            to={`/user/${localStorage.getItem('cb-username')}`}
            activeClassName="test--active"
          >
            <FontAwesomeIcon
              icon="user"
              className="footer__items__logo"
              onClick={this.redirectUser}
            />
          </NavLink>
        </span>
      </div>
    );
  }
}

export default withRouter(Footer);
