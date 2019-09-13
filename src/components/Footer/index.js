import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter } from 'react-router-dom';
import { currentPage } from '../../helpers';
import './footer.scss';

class Footer extends Component {
  constructor() {
    super();
    this.state = {};
  }
  redirectHome = (e) => {
    e.preventDefault();
    this.props.history.push('/');
  };
  redirectSearch = (e) => {
    e.preventDefault();
    this.props.history.push('/search');
  };
  redirectNotification = (e) => {
    e.preventDefault();
    this.props.history.push('/notification');
  };
  redirectUser = (e) => {
    e.preventDefault();
    this.props.history.push(`/user/${localStorage.getItem('cb-username')}`);
  };
  render() {
    const display = currentPage(window.location.pathname);
    console.log(display);
    return (
      <div className={`footer ${display ? '' : ' hide'}`}>
        <span className="footer__items">
          <div className="test">
            <FontAwesomeIcon
              icon="home"
              className="footer__items__logo"
              onClick={this.redirectHome}
            />
          </div>
          <div className="test">
            <FontAwesomeIcon
              icon="search"
              className="footer__items__logo"
              onClick={this.redirectSearch}
            />
          </div>
          <div className="test">
            <FontAwesomeIcon
              icon="plus-circle"
              className="footer__items__logo"
            />
          </div>
          <div className="test">
            <FontAwesomeIcon
              icon="bell"
              className="footer__items__logo"
              onClick={this.redirectNotification}
            />
          </div>
          <div className="test">
            <FontAwesomeIcon
              icon="user"
              className="footer__items__logo"
              onClick={this.redirectUser}
            />
          </div>
        </span>
      </div>
    );
  }
}

export default withRouter(Footer);
