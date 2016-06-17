(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["SimpleReactForm"] = factory(require("react"), require("react-dom"));
	else
		root["SimpleReactForm"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_11__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Field = exports.Form = undefined;

	var _Form = __webpack_require__(5);

	var _Form2 = _interopRequireDefault(_Form);

	var _Field = __webpack_require__(3);

	var _Field2 = _interopRequireDefault(_Field);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Form = _Form2.default;
	exports.Field = _Field2.default;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _FieldStyle = __webpack_require__(10);

	var _FieldStyle2 = _interopRequireDefault(_FieldStyle);

	var _formValidators = __webpack_require__(6);

	var _formValidators2 = _interopRequireDefault(_formValidators);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Field = function (_Component) {
	  _inherits(Field, _Component);

	  function Field(props) {
	    _classCallCheck(this, Field);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Field).call(this, props));

	    _this.state = {
	      value: '',
	      valid: true,
	      error: '',
	      touched: false,
	      rendered: !props.optimize
	    };
	    _this.onChangeHandler = _this.onChangeHandler.bind(_this);
	    _this.mouseOverHandler = _this.mouseOverHandler.bind(_this);
	    _this.onBlur = _this.onBlur.bind(_this);
	    _this.onFocus = _this.onFocus.bind(_this);
	    return _this;
	  }

	  _createClass(Field, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.setFieldState(this.props.value || '');
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (nextProps.forceValidate !== this.props.forceValidate) {
	        this.setFieldState(this.state.value, true, nextProps.validators);
	      }
	      if (nextProps.value !== this.props.value) {
	        this.setFieldState(nextProps.value, true, nextProps.validators);
	      }
	    }
	  }, {
	    key: 'onFocus',
	    value: function onFocus(e) {
	      var el = e.target;
	      while (el.parentNode && !el.parentNode.classList.contains(_FieldStyle2.default['field-wrapper'])) {
	        el = el.parentNode;
	      }
	      el.parentNode.classList.add(_FieldStyle2.default.focused);
	      this.props.highlight && el.parentNode.classList.add(_FieldStyle2.default.highlight);

	      this.props.onFocus && this.props.onFocus(e);
	    }
	  }, {
	    key: 'onBlur',
	    value: function onBlur(e) {
	      var el = e.target;
	      while (el.parentNode && !el.parentNode.classList.contains(_FieldStyle2.default['field-wrapper'])) {
	        el = el.parentNode;
	      }
	      el.parentNode.classList.remove(_FieldStyle2.default.focused);
	      this.props.highlight && el.parentNode.classList.remove(_FieldStyle2.default.highlight);

	      this.setState({ touched: true });
	      this.props.onBlur && this.props.onBlur(e);
	    }
	  }, {
	    key: 'checkForValidation',
	    value: function checkForValidation(value) {
	      var validators = arguments.length <= 1 || arguments[1] === undefined ? this.props.validators : arguments[1];

	      return validators.reduce(function (currentState, validator) {
	        if (currentState.valid) {
	          if (typeof validator === 'function') return validator(value);
	          if (typeof validator === 'string') {
	            if (typeof _formValidators2.default[validator] === 'function') {
	              return _formValidators2.default[validator](value);
	            }
	          } else {
	            throw new Error('No validator to check: ' + validator);
	          }
	        } else {
	          return currentState;
	        }
	      }, { valid: true });
	    }
	  }, {
	    key: 'setFieldState',
	    value: function setFieldState(value) {
	      var touched = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	      var validators = arguments[2];

	      var validationState = this.checkForValidation(value, validators);
	      var valid = validationState.valid;
	      var error = validationState.error;

	      this.setState({ value: value, valid: valid, error: error, touched: touched });
	    }
	  }, {
	    key: 'defaultValueAccessors',
	    value: function defaultValueAccessors(event) {
	      switch (this.props.type) {
	        case 'checkbox':
	          return event.target.checked;
	        default:
	          return event.target ? event.target.value : event;
	      }
	    }
	  }, {
	    key: 'onChangeHandler',
	    value: function onChangeHandler(event) {
	      this.setFieldState(this.props.valueAccessor ? this.props.valueAccessor(event) : this.defaultValueAccessors(event), true);
	      this.props.onChange && this.props.onChange(event);
	    }
	  }, {
	    key: 'mouseOverHandler',
	    value: function mouseOverHandler(event) {
	      this.setState({ rendered: true });
	    }
	  }, {
	    key: 'getValue',
	    value: function getValue() {
	      return this.state.value;
	    }
	  }, {
	    key: 'isValid',
	    value: function isValid() {
	      this.setState({ touched: true });
	      return this.state.valid;
	    }
	  }, {
	    key: 'addPropsToElement',
	    value: function addPropsToElement(element) {
	      return _react2.default.cloneElement(element, {
	        onChange: this.onChangeHandler,
	        onFocus: this.onFocus,
	        onBlur: this.onBlur,
	        ref: this.props.name,
	        value: this.state.value,
	        placeholder: this.props.placeholder
	      });
	    }
	  }, {
	    key: 'getElementByType',
	    value: function getElementByType(type) {
	      var _this2 = this;

	      // text, textarea or select now
	      return {
	        text: _react2.default.createElement('input', { type: 'text',
	          onFocus: this.onFocus,
	          onBlur: this.onBlur,
	          onChange: this.onChangeHandler,
	          ref: this.props.name,
	          value: this.state.value,
	          placeholder: this.props.placeholder,
	          className: _FieldStyle2.default['form-control']
	        }),
	        textarea: _react2.default.createElement('textarea', {
	          onFocus: this.onFocus,
	          onBlur: this.onBlur,
	          onChange: this.onChangeHandler,
	          ref: this.props.name,
	          value: this.state.value,
	          placeholder: this.props.placeholder,
	          className: _FieldStyle2.default['form-control']
	        }),
	        select: _react2.default.createElement(
	          'select',
	          {
	            onFocus: this.onFocus,
	            onBlur: this.onBlur,
	            onChange: this.onChangeHandler,
	            ref: this.props.name,
	            value: this.state.value,
	            selected: this.state.value,
	            placeholder: this.props.placeholder,
	            className: _FieldStyle2.default['form-control']
	          },
	          _react2.default.createElement(
	            'option',
	            { value: '' },
	            'Select'
	          ),
	          this.props.options && this.props.options.map(function (o) {
	            return _react2.default.createElement(
	              'option',
	              { key: o.text || o, value: o.value || o.text || o },
	              o.text || o
	            );
	          })
	        ),
	        radio: this.props.options && this.props.options.map(function (o) {
	          return _react2.default.createElement(
	            'span',
	            { style: { display: 'block' }, key: o.text },
	            _react2.default.createElement('input', { type: 'radio',
	              onFocus: _this2.onFocus,
	              onBlur: _this2.onBlur,
	              onChange: _this2.onChangeHandler,
	              ref: _this2.props.name,
	              value: o.value,
	              name: _this2.props.name,
	              checked: _this2.state.value === o.value,
	              selected: _this2.state.value === o.value
	            }),
	            ' ',
	            o.text
	          );
	        }),
	        checkbox: _react2.default.createElement(
	          'span',
	          { style: { display: 'block' } },
	          _react2.default.createElement('input', { type: 'checkbox',
	            onFocus: this.onFocus,
	            onBlur: this.onBlur,
	            value: this.state.value,
	            onChange: this.onChangeHandler,
	            ref: this.props.name,
	            name: this.props.name,
	            checked: this.state.value
	          })
	        )
	      }[type];
	    }
	  }, {
	    key: 'getActualInput',
	    value: function getActualInput() {
	      if (this.props.element && this.props.optimize && !this.state.rendered) {
	        return _react2.default.createElement('input', { type: 'text',
	          ref: this.props.name,
	          defaultValue: this.props.value,
	          placeholder: this.props.placeholder,
	          className: _FieldStyle2.default['form-control'],
	          onMouseOver: this.mouseOverHandler,
	          onFocus: this.mouseOverHandler
	        });
	      }
	      return this.props.element ? this.addPropsToElement(this.props.element) : this.getElementByType(this.props.type);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var validationClass = this.state.touched ? this.state.valid ? _FieldStyle2.default.success : _FieldStyle2.default.error : '';
	      return _react2.default.createElement(
	        'div',
	        {
	          className: _FieldStyle2.default['field-wrapper'] + '\n          ' + (this.props.inline ? _FieldStyle2.default['make-inline'] : ''),
	          style: this.props.style
	        },
	        this.props.label && _react2.default.createElement(
	          'div',
	          { className: _FieldStyle2.default.label, style: this.props.labelStyle },
	          _react2.default.createElement(
	            'span',
	            null,
	            this.props.label
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: _FieldStyle2.default.control + ' ' + validationClass, style: this.props.controlStyle },
	          this.getActualInput(),
	          !this.state.valid && this.state.touched && _react2.default.createElement(
	            'div',
	            { className: _FieldStyle2.default.message },
	            this.state.error
	          )
	        ),
	        this.props.help && _react2.default.createElement('div', {
	          className: _FieldStyle2.default.helpText,
	          style: this.props.helpStyle,
	          dangerouslySetInnerHTML: { __html: this.props.help }
	        })
	      );
	    }
	  }]);

	  return Field;
	}(_react.Component);

	Field.defaultProps = {
	  highlight: false,
	  validators: [],
	  type: 'text',
	  style: {},
	  helpStyle: {},
	  controlStyle: {},
	  placeholder: '',
	  optimize: false
	};

	Field.propTypes = {
	  name: _react.PropTypes.string.isRequired,
	  label: _react.PropTypes.string,
	  value: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.bool, _react.PropTypes.number]),
	  type: _react.PropTypes.string,
	  help: _react.PropTypes.string,
	  highlight: _react.PropTypes.bool,
	  options: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.shape({
	    text: _react.PropTypes.string,
	    value: _react.PropTypes.string
	  })), _react.PropTypes.arrayOf(_react.PropTypes.string)]),
	  element: _react.PropTypes.element,
	  validators: _react.PropTypes.array,
	  onChange: _react.PropTypes.func,
	  style: _react.PropTypes.object,
	  helpStyle: _react.PropTypes.object,
	  controlStyle: _react.PropTypes.object,
	  labelStyle: _react.PropTypes.object,
	  placeholder: _react.PropTypes.string,
	  inline: _react.PropTypes.bool,
	  forceValidate: _react.PropTypes.bool,
	  valueAccessor: _react.PropTypes.func,
	  optimize: _react.PropTypes.bool
	};
	exports.default = Field;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Field = __webpack_require__(2);

	var _Field2 = _interopRequireDefault(_Field);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _Field2.default;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(11);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Form = function (_Component) {
	  _inherits(Form, _Component);

	  function Form(props) {
	    _classCallCheck(this, Form);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Form).call(this));

	    _this.state = {
	      rendered: !props.onDemand
	    };
	    _this.scrollHandler = _this.scrollHandler.bind(_this);
	    return _this;
	  }

	  _createClass(Form, [{
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      if (this.props.onDemand) window.removeEventListener('scroll', this.scrollHandler);
	    }
	  }, {
	    key: 'getFormValues',
	    value: function getFormValues() {
	      var _this2 = this;

	      var children = _react2.default.Children.toArray(this.props.children);
	      return children.reduce(function (prev, field) {
	        return _extends({}, prev, _defineProperty({}, field.props.name, _this2.refs[field.props.name].getValue()));
	      }, {});
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      if (this.props.onDemand) {
	        window.addEventListener('scroll', this.scrollHandler);
	        var el = _reactDom2.default.findDOMNode(this);
	        this.el = el;
	      }
	    }
	  }, {
	    key: 'scrollHandler',
	    value: function scrollHandler(event) {
	      var el = this.el;
	      var rect = el.getBoundingClientRect();

	      var status = rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);

	      if (status) {
	        window.removeEventListener('scroll', this.scrollHandler);
	        this.setState({ rendered: true });
	      }
	    }
	  }, {
	    key: 'isValid',
	    value: function isValid() {
	      var _this3 = this;

	      var children = _react2.default.Children.toArray(this.props.children);
	      return children.reduce(function (valid, field) {
	        var isValid = _this3.refs[field.props.name].isValid();
	        return valid && isValid;
	      }, true);
	    }
	  }, {
	    key: 'getRenderElements',
	    value: function getRenderElements() {
	      if (this.props.onDemand && !this.state.rendered) {
	        return _react2.default.createElement('div', null);
	      } else {
	        var children = _react2.default.Children.toArray(this.props.children);
	        return _react2.default.Children.map(children, function (Field) {
	          return _react2.default.cloneElement(Field, {
	            ref: Field.props.name,
	            key: Field.props.name
	          });
	        });
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'form',
	        null,
	        this.getRenderElements()
	      );
	    }
	  }]);

	  return Form;
	}(_react.Component);

	Form.defaultProps = {
	  onDemand: false
	};

	Form.propTypes = {
	  children: _react.PropTypes.node,
	  onDemand: _react.PropTypes.bool
	};

	exports.default = Form;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Form = __webpack_require__(4);

	var _Form2 = _interopRequireDefault(_Form);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _Form2.default;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function required(arg) {
	  if (arg) arg = arg.trim();
	  if (arg) return { valid: true, error: '' };

	  return { valid: false, error: 'Field cannot be empty or spaces.' };
	}

	exports.default = {
	  required: required
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports


	// module
	exports.push([module.id, ".Field-style---field-wrapper---3SIgg {\n  padding: 5px 0px;\n  margin-bottom: 8px;\n  min-height: 40px;\n}\n\n.Field-style---field-wrapper---3SIgg .Field-style---form-control---30QkE {\n  padding: 4px 8px;\n  width: 100%;\n  box-sizing: border-box;\n  border: 1px solid #ccc;\n  border-radius: 4px;\n  outline: none;\n}\n\n.Field-style---field-wrapper---3SIgg input[type=text], .Field-style---field-wrapper---3SIgg select, .Field-style---field-wrapper---3SIgg textarea {\n  height: 36px;\n  font-size:12px;\n}\n\n.Field-style---field-wrapper---3SIgg input[type=radio] {\n  width: auto;\n}\n\n.Field-style---field-wrapper---3SIgg .Field-style---label---2SCH5 {\n  color: #777;\n  padding: 0px 15px;\n  vertical-align: top;\n  box-sizing:border-box;\n  margin-bottom: 5px;\n}\n\n.Field-style---field-wrapper---3SIgg .Field-style---control---2zjKF{\n  padding: 0px 15px;\n  vertical-align: top;\n  box-sizing:border-box;\n}\n\n.Field-style---field-wrapper---3SIgg .Field-style---helpText---QV7OE {\n  padding: 0px 15px;\n  box-sizing:border-box;\n  color: #123456;\n  display: none;\n  font-family: monospace;\n}\n\n.Field-style---field-wrapper---3SIgg .Field-style---error---_NAIT .Field-style---form-control---30QkE {\n  border: 1px solid red;\n}\n\n.Field-style---field-wrapper---3SIgg .Field-style---error---_NAIT .Field-style---message---1zkBf{\n  margin-top: 5px;\n  color: red;\n  font-size: 12px\n}\n\n.Field-style---field-wrapper---3SIgg .Field-style---success---QDqUS .Field-style---form-control---30QkE {\n  border: 1px solid lightgreen;\n}\n\n.Field-style---field-wrapper---3SIgg.Field-style---focused---1mGM6 .Field-style---helpText---QV7OE {\n  display: block;\n}\n\n.Field-style---field-wrapper---3SIgg.Field-style---focused---1mGM6 .Field-style---form-control---30QkE {\n  border: 1px solid lightblue;\n}\n\n.Field-style---field-wrapper---3SIgg.Field-style---focused---1mGM6 .Field-style---error---_NAIT .Field-style---message---1zkBf {\n  display: none;\n}\n\n.Field-style---field-wrapper---3SIgg.Field-style---highlight---3_avl {\n  background: #FFF;\n  border-radius: 3px;\n  box-shadow: 0 0px 10px rgba(0,0,0,0.3);\n}\n\n.Field-style---field-wrapper---3SIgg.Field-style---highlight---3_avl textarea {\n  height: 100px;\n}\n\n.Field-style---make-inline---3RDwH .Field-style---label---2SCH5 {\n  text-align: right;\n  width: 20%;\n  display: inline-block;\n  margin-bottom: 0px;\n}\n\n.Field-style---make-inline---3RDwH .Field-style---control---2zjKF {\n  width: 40%;\n  display: inline-block;\n}\n\n.Field-style---make-inline---3RDwH.Field-style---focused---1mGM6 .Field-style---helpText---QV7OE {\n  width: 40%;\n  display: inline-block;\n}\n\n.Field-style---hidden---3M1CJ{\n  display: none;\n}\n", ""]);

	// exports
	exports.locals = {
		"field-wrapper": "Field-style---field-wrapper---3SIgg",
		"form-control": "Field-style---form-control---30QkE",
		"label": "Field-style---label---2SCH5",
		"control": "Field-style---control---2zjKF",
		"helpText": "Field-style---helpText---QV7OE",
		"error": "Field-style---error---_NAIT",
		"message": "Field-style---message---1zkBf",
		"success": "Field-style---success---QDqUS",
		"focused": "Field-style---focused---1mGM6",
		"highlight": "Field-style---highlight---3_avl",
		"make-inline": "Field-style---make-inline---3RDwH",
		"hidden": "Field-style---hidden---3M1CJ"
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(7);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?modules&localIdentName=[name]---[local]---[hash:base64:5]!./../../node_modules/postcss-loader/index.js!./Field.style.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?modules&localIdentName=[name]---[local]---[hash:base64:5]!./../../node_modules/postcss-loader/index.js!./Field.style.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_11__;

/***/ }
/******/ ])
});
;