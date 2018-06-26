import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './Field.style.css';
import availableValidators from '../Utils/form-validators';

class Field extends Component {
  constructor (props) {
    super(props);
    this.state = {
      value: '',
      valid: true,
      error: '',
      touched: false,
      rendered: !props.optimize
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.mouseOverHandler = this.mouseOverHandler.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  componentDidMount () {
    this.setFieldState(this.props.defaultValue || this.props.value || '');
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.forceValidate !== this.props.forceValidate) {
      this.setFieldState(this.state.value, true, nextProps.validators);
    }
    if (nextProps.value !== this.props.value || nextProps.validators !== this.props.validators) {
      this.setFieldState(nextProps.value, true, nextProps.validators);
    }
  }

  onFocus (e) {
    let el = e.target;
    while (el.parentNode && !el.parentNode.classList.contains(styles['field-wrapper'])) {
      el = el.parentNode;
    }
    el.parentNode.classList.add(styles.focused);
    this.props.highlight && el.parentNode.classList.add(styles.highlight);

    this.props.onFocus && this.props.onFocus(e);
  }

  onBlur (e) {
    let el = e.target;
    while (el.parentNode && !el.parentNode.classList.contains(styles['field-wrapper'])) {
      el = el.parentNode;
    }
    el.parentNode.classList.remove(styles.focused);
    this.props.highlight && el.parentNode.classList.remove(styles.highlight);

    this.setState({touched: true}, () => {
      this.props.onBlur && this.props.onBlur(e);
    });
  }

  checkForValidation (value, validators = this.props.validators) {
    return validators.reduce((currentState, validator) => {
      if (currentState.valid) {
        if (typeof validator === 'function') return validator(value);
        if (typeof validator === 'string') {
          if (typeof availableValidators[validator] === 'function') {
            return availableValidators[validator](value);
          }
        } else {
          throw new Error('No validator to check: ' + validator);
        }
      } else {
        return currentState;
      }
    }, {valid: true});
  }

  setFieldState (value, touched = false, validators, callback) {
    let validationState = this.checkForValidation(value, validators);
    let {valid, error} = validationState;
    this.setState({value, valid, error, touched}, callback);
  }

  defaultValueAccessors (event) {
    switch (this.props.type) {
      case 'checkbox':
        return event.target.checked;
      default:
        return event.target ? event.target.value : event;
    }
  }

  onChangeHandler (event) {
    this.setFieldState(
      this.props.valueAccessor ? this.props.valueAccessor(event) : this.defaultValueAccessors(event),
      true,
      this.props.validators,
      () => this.props.onChange && this.props.onChange(event)
    );
  }

  mouseOverHandler (event) {
    this.setState({rendered: true});
  }

  getValue () {
    return this.state.value;
  }

  isValid () {
    this.setState({touched: true});
    return this.state.valid;
  }

  addPropsToElement (element) {
    return React.cloneElement(element, {
      onChange: this.onChangeHandler,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      ref: this.props.name,
      value: this.state.value,
      placeholder: this.props.placeholder
    });
  }

  getElementByType (type) {
    // text, textarea or select now
    return {
      text: (
        <input type='text'
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChange={this.onChangeHandler}
          ref={this.props.name}
          name={this.props.name}
          value={this.state.value}
          placeholder={this.props.placeholder}
          className={styles['form-control']}
          disabled={this.props.disabled}
        />
      ),
      textarea: (
        <textarea
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChange={this.onChangeHandler}
          ref={this.props.name}
          name={this.props.name}
          value={this.state.value}
          placeholder={this.props.placeholder}
          className={styles['form-control']}
          disabled={this.props.disabled}
        ></textarea>
      ),
      select: (
        <select
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChange={this.onChangeHandler}
          ref={this.props.name}
          value={this.state.value}
          selected={this.state.value}
          placeholder={this.props.placeholder}
          className={styles['form-control']}
          disabled={this.props.disabled}
        >
            <option value=''>Select</option>
          { this.props.options &&
            this.props.options
              .map(o => <option key={o.text || o} value={o.value || o.text || o}>{o.text || o}</option>)
          }
        </select>
      ),
      radio: (
        this.props.options && this.props.options.map(o => {
          return (
            <span style={{display: 'block'}} key={o.text}>
              <input type='radio'
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                onChange={this.onChangeHandler}
                ref={this.props.name}
                value={o.value}
                name={this.props.name}
                checked={this.state.value === o.value}
                selected={this.state.value === o.value}
                disabled={this.props.disabled}
              /> {o.text}
            </span>
          );
        })
      ),
      checkbox: (
        <span style={{display: 'block'}}>
          <input type='checkbox'
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            value={this.state.value}
            onChange={this.onChangeHandler}
            ref={this.props.name}
            name={this.props.name}
            checked={this.state.value}
            disabled={this.props.disabled}
          />
        </span>
      )
    }[type];
  }

  getActualInput () {
    if (this.props.element && this.props.optimize && !this.state.rendered) {
      return <input type='text'
        ref={this.props.name}
        defaultValue={this.props.value}
        placeholder={this.props.placeholder}
        className={styles['form-control']}
        onMouseOver={this.mouseOverHandler}
        onFocus={this.mouseOverHandler}
        disabled={this.props.disabled}
      />;
    }
    return this.props.element ? this.addPropsToElement(this.props.element) : this.getElementByType(this.props.type);
  }

  render () {
    const validationClass = this.state.touched ? (this.state.valid ? styles.success : styles.error) : '';
    return (
      <div
        className={`${styles['field-wrapper']}
          ${this.props.inline ? styles['make-inline'] : ''}`}
        style={this.props.style}
      >
        {this.props.label && (
          <div className={styles.label} style={this.props.labelStyle}>
            <span>{this.props.label}</span>
          </div>
        )}
        <div className={styles.control + ' ' + (validationClass)} style={this.props.controlStyle}>
          {this.getActualInput()}
          {(!this.state.valid && this.state.touched) && (
            <div className={styles.message}>
              {this.state.error}
            </div>
          )}
        </div>
        {this.props.help && (
          <div
            className={styles.helpText}
            style={this.props.helpStyle}
            dangerouslySetInnerHTML={{__html: this.props.help}}
            />
        )}
      </div>
    );
  }
}

Field.defaultProps = {
  highlight: false,
  validators: [],
  type: 'text',
  style: {},
  helpStyle: {},
  controlStyle: {},
  placeholder: '',
  optimize: false,
  disabled: false,
};

Field.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.number
  ]),
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.number
  ]),
  type: PropTypes.string,
  help: PropTypes.string,
  highlight: PropTypes.bool,
  options: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    value: PropTypes.string
  })), PropTypes.arrayOf(PropTypes.string)]),
  element: PropTypes.element,
  disabled: PropTypes.bool,
  validators: PropTypes.array,
  onChange: PropTypes.func,
  style: PropTypes.object,
  helpStyle: PropTypes.object,
  controlStyle: PropTypes.object,
  labelStyle: PropTypes.object,
  placeholder: PropTypes.string,
  inline: PropTypes.bool,
  forceValidate: PropTypes.bool,
  valueAccessor: PropTypes.func,
  optimize: PropTypes.bool
};
export default Field;
