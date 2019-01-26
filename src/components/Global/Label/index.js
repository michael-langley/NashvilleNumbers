import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  customClasses: PropTypes.string,
  style: PropTypes.instanceOf(Object),
  htmlAttributes: PropTypes.instanceOf(Object),
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
    .isRequired,
  htmlFor: PropTypes.string.isRequired,
};
const defaultProps = {
  customClasses: '',
  style: {},
  htmlAttributes: {},
};

const Label = ({
  customClasses,
  style,
  htmlAttributes,
  children,
  htmlFor,
}) => {
  const classes = classNames({
    [customClasses]: !!customClasses,
  });

  return (
    <label
      className={classes}
      style={style}
      htmlFor={htmlFor}
      {...htmlAttributes}
    >
      {children}
    </label>
  );
};

export default Label;

Label.propTypes = propTypes;
Label.defaultProps = defaultProps;
