import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  placeholder: PropTypes.string,
  initialValue: PropTypes.string,
  customClasses: PropTypes.string,
  value: PropTypes.string,
  handleValue: PropTypes.func,
  style: PropTypes.instanceOf(Object),
  htmlAttributes: PropTypes.instanceOf(Object),
};
const defaultProps = {
  placeholder: '',
  initialValue: '',
  customClasses: '',
  value: undefined,
  handleValue: () => {},
  style: {},
  htmlAttributes: {},
};

class Input extends React.Component {
  /* eslint-disable-next-line react/no-unused-state */
  state = { value: '' };

  componentDidMount() {
    const { initialValue } = this.props;

    if (initialValue) {
      this.internalSetState({ value: initialValue });
    }
  }

  getState(state = this.state) {
    const returnedState = {
      value:
        this.props.value === undefined
          ? state.value
          : this.props.value,
    };

    return returnedState;
  }

  internalSetState(changes, callback = () => {}) {
    let allChanges;
    this.setState(
      (state) => {
        const actualState = this.getState(state);
        const changesObject = typeof changes === 'function'
          ? changes(actualState)
          : changes;
        allChanges = { ...actualState, ...changesObject };
        return allChanges;
      },
      () => {
        this.props.handleValue(allChanges.value);
        callback();
      },
    );
  }

  handleInput(value) {
    this.internalSetState({ value });
  }

  render() {
    const {
      type,
      placeholder,
      customClasses,
      style,
      htmlAttributes,
    } = this.props;
    const classes = classNames('form-control', {
      [customClasses]: !!customClasses,
    });
    return (
      <input
        style={style}
        placeholder={placeholder}
        value={this.getState().value}
        onChange={e => this.handleInput(e.target.value)}
        type={type}
        className={classes}
        {...htmlAttributes}
      />
    );
  }
}

export default Input;

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;
