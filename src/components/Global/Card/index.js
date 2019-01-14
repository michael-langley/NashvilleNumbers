import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  customClasses: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
    .isRequired,
  style: PropTypes.instanceOf(Object),
  htmlAttributes: PropTypes.instanceOf(Object),
};

const defaultProps = {
  customClasses: '',
  style: {},
  htmlAttributes: {},
};

class Card extends Component {
  static Header = ({
    children,
    customClasses,
    style,
    htmlAttributes,
  }) => {
    const classes = classNames('card-header', {
      [customClasses]: !!customClasses,
    });
    return (
      <div className={classes} style={style} {...htmlAttributes}>
        {children}
      </div>
    );
  };

  static Body = ({
    children,
    customClasses,
    style,
    htmlAttributes,
  }) => {
    const classes = classNames('card-body', {
      [customClasses]: !!customClasses,
    });
    return (
      <div className={classes} style={style} {...htmlAttributes}>
        {children}
      </div>
    );
  };

  static Footer = ({
    children,
    customClasses,
    style,
    htmlAttributes,
  }) => {
    const classes = classNames('card-footer', {
      [customClasses]: !!customClasses,
    });
    return (
      <div className={classes} style={style} {...htmlAttributes}>
        {children}
      </div>
    );
  };

  render() {
    const {
      children,
      customClasses,
      style,
      htmlAttributes,
    } = this.props;
    const classes = classNames('card', {
      [customClasses]: !!customClasses,
    });
    return (
      <div className={classes} style={style} {...htmlAttributes}>
        {children}
      </div>
    );
  }
}

export default Card;

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;
