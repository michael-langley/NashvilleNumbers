import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Menu.module.scss';

const propTypes = {
  customClasses: PropTypes.string,
  topOnly: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
    .isRequired,
  locationClassname: PropTypes.string,
  style: PropTypes.instanceOf(Object),
  htmlAttributes: PropTypes.instanceOf(Object),
};
const defaultProps = {
  topOnly: false,
  locationClassname: '',
  customClasses: '',
  style: {},
  htmlAttributes: {},
};

const Menu = ({
  customClasses,
  topOnly,
  children,
  locationClassname,
  style,
  htmlAttributes,
}) => {
  const classes = classNames(styles.menu, {
    [styles['menu-top']]: !!topOnly,
    [customClasses]: !!customClasses,
    [locationClassname]: !!locationClassname && !topOnly,
  });

  return (
    <div className={classes} style={style} {...htmlAttributes}>
      {children}
    </div>
  );
};

export default Menu;

Menu.propTypes = propTypes;
Menu.defaultProps = defaultProps;
