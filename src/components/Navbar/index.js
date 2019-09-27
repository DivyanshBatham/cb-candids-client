import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import PumpkinWithText from '../../assets/pumpkinWithText';
import './navbar.scss';


const Navbar = (props) => {
  const {
    showBackIcon, showCrossIcon, showOptionsIcon, showCheckIcon,
    handleCancel, handleSubmit, handleOptions,
  } = props;

  const handleGoBack = (e) => {
    e.preventDefault();
    props.history.length <= 2
      ? props.history.push('/')
      : props.history.goBack();
  };

  return (
    <nav className="navbar">

      <div className="box">
        {showBackIcon &&
          <div className="iconContainer">
            <FontAwesomeIcon
              icon="angle-left"
              onClick={handleGoBack}
            />
          </div>
        }
        {showCrossIcon &&
          <div className="iconContainer">
            <FontAwesomeIcon
              icon="times"
              onClick={handleCancel}
            />
          </div>
        }
      </div>

      <Link to="/" className="navbar__logo">
        <PumpkinWithText />
      </Link>

      <div className="box">
        {showOptionsIcon &&
          <div className="iconContainer">
            <FontAwesomeIcon
              icon="ellipsis-v"
              onClick={handleOptions}
            />
          </div>
        }
        {showCheckIcon &&
          <div className="iconContainer">
            <FontAwesomeIcon
              icon="check"
              onClick={handleSubmit}
            />
          </div>
        }
      </div>

    </nav>
  );
};

// TODO: I can probably merge showCross and showCheck
Navbar.propTypes = {
  showBackIcon: PropTypes.bool,
  showOptionsIcon: PropTypes.bool,
  showCrossIcon: PropTypes.bool,
  showCheckIcon: PropTypes.bool,
  handleCancel: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleOptions: PropTypes.func,
};

Navbar.defaultProps = {
  showBackIcon: false,
  showOptionsIcon: false,
  showCrossIcon: true,
  showCheckIcon: true,
  handleCancel: () => { },
  handleSubmit: () => { },
  handleOptions: () => { },
};
export default withRouter(Navbar);
