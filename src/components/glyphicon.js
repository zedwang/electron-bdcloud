import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

const Glyphicon = (props) => {
  const prefix = 'icon';
  const { name, ...other } = props;

  const classes = `icon-${name}`;

  return <span className={classNames(prefix, classes)} {...other}/>;
};

Glyphicon.propTypes = {
  name: PropTypes.string.isRequired
};

export default Glyphicon;