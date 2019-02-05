import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Button.module.css';

const propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
    .isRequired,
  customClasses: PropTypes.string,
  disabled: PropTypes.bool,
  small: PropTypes.bool,
  xsmall: PropTypes.bool,
  style: PropTypes.instanceOf(Object),
  htmlAttributes: PropTypes.instanceOf(Object),
};
const defaultProps = {
  onClick: () => {},
  customClasses: '',
  disabled: false,
  small: false,
  xsmall: false,
  style: {},
  htmlAttributes: {},
};

const Button = ({
  children,
  onClick,
  disabled,
  customClasses,
  small,
  xsmall,
  style,
  htmlAttributes,
}) => {
  const classes = classNames('btn-primary', styles.btn, {
    [customClasses]: !!customClasses,
    [styles['btn-small']]: !!small,
    [styles['btn-xsmall']]: !!xsmall,
  });

  return (
    <button
      onClick={onClick}
      type="button"
      className={classes}
      aria-label="button"
      disabled={disabled}
      style={style}
      {...htmlAttributes}
    >
      {children}
    </button>
  );
};

export default Button;

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;
