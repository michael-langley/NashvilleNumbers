import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Backdrop.module.scss';

const propTypes = {
  show: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  transparent: PropTypes.bool,
  style: PropTypes.instanceOf(Object),
  htmlAttributes: PropTypes.instanceOf(Object),
};

const defaultProps = {
  onClick: () => {},
  transparent: false,
  style: {},
  htmlAttributes: {},
};

const Backdrop = ({
  show,
  onClick,
  transparent,
  style,
  htmlAttributes,
}) => {
  const classes = classNames(styles.backdrop, {
    [styles['backdrop-transparent']]: !!transparent,
  });
  return show ? (
    /* eslint-disable jsx-a11y/click-events-have-key-events */
    <div
      className={classes}
      onClick={onClick}
      style={style}
      {...htmlAttributes}
      role="button"
      tabIndex="-1"
    />
  ) : null;
};

export default Backdrop;

Backdrop.propTypes = propTypes;
Backdrop.defaultProps = defaultProps;
