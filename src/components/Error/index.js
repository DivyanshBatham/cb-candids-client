import React from 'react';
import SadPumpkin from '../../assets/sadPumpkin';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './error.scss';

const Error = props => (
  <div className="error">
    <div className="error__logo">
      <Link to="/">
        <SadPumpkin />
      </Link>
    </div>
    {props.error}
  </div>
);

Error.propTypes = {
  error: PropTypes.string.isRequired,
};
export default Error;
