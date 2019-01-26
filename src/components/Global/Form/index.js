import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  customClasses: PropTypes.string,
  style: PropTypes.instanceOf(Object),
  htmlAttributes: PropTypes.instanceOf(Object),
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
    .isRequired,
};
const defaultProps = {
  customClasses: '',
  style: {},
  htmlAttributes: {},
};

const Form = ({
  customClasses, style, htmlAttributes, children,
}) => {
  const classes = classNames({
    [customClasses]: !!customClasses,
  });

  return (
    <form className={classes} style={style} {...htmlAttributes}>
      {children}
    </form>
  );
};

export default Form;

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;
