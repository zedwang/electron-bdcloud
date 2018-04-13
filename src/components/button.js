import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import '../styles/button.scss';

const defaultProps = {
  type: 'default',
  active: false,
  disabled: false,
  size: 'md'
};

function prefix(...props) {
  const classes = props.map(value => {
    if (value) {
      return `btn-${value}`;
    }
  });
  return classes.join(' ');
}

const Button = (props) => {
  const { type, size, disabled, icon, text, className, active, ...other } = props;

  return (
    <button className={classNames('btn', prefix(type, size), className, {'active': active})} {...other} disabled={disabled}>
      {icon ? <FontAwesomeIcon icon={icon}/> : ''}&nbsp;{text}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  active: PropTypes.bool,
  type: PropTypes.oneOf(['danger','default','success', 'link']),
  size: PropTypes.oneOf(['lg', 'md', 'sm']),
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  text: PropTypes.string,
  href: PropTypes.string
};
Button.defaultProps = defaultProps;

export default Button;