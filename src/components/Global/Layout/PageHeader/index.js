import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './PageHeader.module.scss';

const propTypes = {
  customContainerClasses: PropTypes.string,
  customTitleClasses: PropTypes.string,
  text: PropTypes.string.isRequired,
  containerStyle: PropTypes.instanceOf(Object),
  containerAttributes: PropTypes.instanceOf(Object),
  titleStyle: PropTypes.instanceOf(Object),
  titleAttributes: PropTypes.instanceOf(Object),
};
const defaultProps = {
  customContainerClasses: '',
  customTitleClasses: '',
  containerStyle: {},
  containerAttributes: {},
  titleStyle: {},
  titleAttributes: {},
};

const PageHeader = ({
  customContainerClasses,
  customTitleClasses,
  text,
  containerAttributes,
  containerStyle,
  titleAttributes,
  titleStyle,
}) => {
  const containerClasses = classNames(
    styles['page-header__container'],
    {
      [customContainerClasses]: !!customContainerClasses,
    },
  );

  const titleClasses = classNames(styles['page-header__title'], {
    [customTitleClasses]: !!customTitleClasses,
  });

  return (
    <div
      className={containerClasses}
      style={containerStyle}
      {...containerAttributes}
    >
      <h4
        className={titleClasses}
        style={titleStyle}
        {...titleAttributes}
      >
        {text}
      </h4>
    </div>
  );
};

export default PageHeader;

PageHeader.propTypes = propTypes;
PageHeader.defaultProps = defaultProps;
