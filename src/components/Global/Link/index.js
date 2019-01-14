import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link as NavLink } from '@reach/router';
import styles from './Link.module.scss';

const propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
    .isRequired,
  customClasses: PropTypes.string,
  to: PropTypes.string.isRequired,
  style: PropTypes.instanceOf(Object),
  htmlAttributes: PropTypes.instanceOf(Object),
};
const defaultProps = {
  customClasses: '',
  style: {},
  htmlAttributes: {},
};

const Link = ({
  children,
  customClasses,
  to,
  htmlAttributes,
  style,
}) => {
  const classes = classNames(styles.link, {
    [customClasses]: !!customClasses,
  });
  return (
    <NavLink
      to={to}
      className={classes}
      style={style}
      {...htmlAttributes}
    >
      {children}
    </NavLink>
  );
};

export default Link;

Link.propTypes = propTypes;
Link.defaultProps = defaultProps;
