import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Footer.module.css';

const propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
    .isRequired,
  customClasses: PropTypes.string,
  style: PropTypes.instanceOf(Object),
  htmlAttributes: PropTypes.instanceOf(Object),
};
const defaultProps = {
  customClasses: '',
  style: {},
  htmlAttributes: {},
};

const Footer = ({
  customClasses, children, style, htmlAttributes,
}) => {
  const classes = classNames(
    'navbar',
    'navbar-expand-lg',
    'navbar-light',
    'shadow-sm',
    styles.footer,
    {
      [customClasses]: !!customClasses,
    },
  );
  return (
    <footer className={classes} style={style} {...htmlAttributes}>
      {children}
    </footer>
  );
};

export default Footer;

Footer.propTypes = propTypes;
Footer.defaultProps = defaultProps;
