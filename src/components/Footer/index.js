import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter, NavLink } from 'react-router-dom';
import { currentPage } from '../../helpers';
import './footer.scss';

class Footer extends Component {
  constructor() {
    super();
    this.state = {
    };
  }
  render() {
    const display = currentPage(window.location.pathname);
    const currentLoggedInUser = localStorage.getItem('cb-username');

    console.log(display);
    return (
      <div className={`footer ${display ? '' : ' hide'}`}>
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
            to="/notification"
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
