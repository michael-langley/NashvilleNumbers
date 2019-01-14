import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.string,
  initialValue: PropTypes.string,
  customClasses: PropTypes.string,
  formClass: PropTypes.string,
  value: PropTypes.string,
  handleInternalVal: PropTypes.func,
  handleInput: PropTypes.func,
  formStyle: PropTypes.instanceOf(Object),
  formAttributes: PropTypes.instanceOf(Object),
  inputStyle: PropTypes.instanceOf(Object),
  inputAttributes: PropTypes.instanceOf(Object),
};
const defaultProps = {
  placeholder: '',
  type: 'text',
  initialValue: '',
  customClasses: '',
  formClass: '',
  value: undefined,
  handleInternalVal: () => {},
  handleInput: () => {},
  formStyle: {},
  formAttributes: {},
  inputStyle: {},
  inputAttributes: {},
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
    const { value } = this.props;
    const returnedState = {
      value: value !== undefined ? value : state.value,
    };

    return returnedState;
  }

  internalSetState(changes, callback = () => {}) {
    const { handleInput } = this.props;
    let returnedState;

    this.setState(
      (state) => {
        const actualState = this.getState(state);
        returnedState = { ...actualState, ...changes };
        return returnedState;
      },
      () => {
        handleInput(returnedState.value);
        callback();
      },
    );
  }

  handleInput(value) {
    const { handleInternalVal } = this.props;
    this.internalSetState({ value }, () => {
      handleInternalVal(this.getState().value);
    });
  }

  render() {
    const {
      type,
      placeholder,
      customClasses,
      formClass,
      formStyle,
      formAttributes,
      inputStyle,
      inputAttributes,
    } = this.props;
    const classes = classNames('form-control', {
      [customClasses]: !!customClasses,
    });
    return (
      <form
        className={formClass}
        style={formStyle}
        {...formAttributes}
      >
        <input
          style={inputStyle}
          placeholder={placeholder}
          value={this.getState().value}
          onChange={e => this.handleInput(e.target.value)}
          type={type}
          className={classes}
          {...inputAttributes}
        />
      </form>
    );
  }
}

export default Input;

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;
