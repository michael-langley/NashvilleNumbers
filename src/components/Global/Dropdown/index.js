import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import classNames from 'classnames';
import scssStyles from './Dropdown.module.scss';
import jsStyles from './Dropdown.Styles';

const propTypes = {
  dropdownLabel: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.func,
  ]),
  onChange: PropTypes.func,
  options: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.func,
  ]),
  isMulti: PropTypes.bool,
  additionalContainerClasses: PropTypes.string,
  additonalLabelClasses: PropTypes.string,
  containerStyle: PropTypes.instanceOf(Object),
  selectStyle: PropTypes.instanceOf(Object),
};

const defaultProps = {
  dropdownLabel: '',
  placeholder: '',
  value: null,
  onChange: () => {},
  options: null,
  isMulti: false,
  additionalContainerClasses: '',
  additonalLabelClasses: '',
  containerStyle: {},
  selectStyle: null,
};

const Dropdown = ({
  dropdownLabel,
  placeholder,
  value,
  onChange,
  options,
  isMulti,
  additionalContainerClasses,
  additonalLabelClasses,
  containerStyle,
  selectStyle,
}) => {
  const containerClass = classNames(
    scssStyles['dropdown-container'],
    {
      [additionalContainerClasses]: !!additionalContainerClasses,
    },
  );
  const labelClass = classNames(
    scssStyles['dropdown-container__label'],
    {
      [additonalLabelClasses]: !!additonalLabelClasses,
    },
  );

  const styles = { ...jsStyles, ...selectStyle };

  return (
    <div className={containerClass} style={containerStyle}>
      {dropdownLabel && (
        <div className={labelClass}>{dropdownLabel}</div>
      )}
      <ReactSelect
        isMulti={isMulti}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        options={options}
        styles={styles}
      />
    </div>
  );
};

export default Dropdown;

Dropdown.propTypes = propTypes;
Dropdown.defaultProps = defaultProps;
