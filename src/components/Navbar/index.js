import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import DropdownOptions from '../../components/DropdownOptions';
import PumpkinWithText from '../../assets/pumpkinWithText';
import './navbar.scss';


const Navbar = (props) => {
  const {
    showBackIcon, showCrossIcon, showOptionsIcon, showCheckIcon,
    handleCancel, handleSubmit, options,
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
          <div className="iconContainer iconContainer--light">
            <FontAwesomeIcon
              icon="angle-left"
              onClick={handleGoBack}
            />
          </div>
        }
        {showCrossIcon &&
          <div className="iconContainer iconContainer--light">
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
          <DropdownOptions
            lightIcon
            iconProps={{ fontSize: '1rem' }}
            options={options}
          />
        }
        {showCheckIcon &&
          <div className="iconContainer iconContainer--light">
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
  options: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    handleClick: PropTypes.func,
  })),
};

Navbar.defaultProps = {
  showBackIcon: false,
  showOptionsIcon: false,
  showCrossIcon: false,
  showCheckIcon: false,
  options: [],
  handleCancel: () => { },
  handleSubmit: () => { },
};
export default withRouter(Navbar);
