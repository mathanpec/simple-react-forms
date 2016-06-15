import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import styles from './Form.style.css';

class Form extends Component {
  constructor () {
    super();
    this.state = {
      rendered: false,
      el: null
    };
    this.scrollHandler = this.scrollHandler.bind(this);
  }

  componentWillUnmount () {
    if (this.props.optimize) window.removeEventListener('scroll', this.scrollHandler);
  }

  getFormValues () {
    let children = React.Children.toArray(this.props.children);
    return children.reduce((prev, field) => {
      return {...prev, [field.props.name]: this.refs[field.props.name].getValue()};
    }, {});
  }

  componentDidMount () {
    if (this.props.optimize) {
      window.addEventListener('scroll', this.scrollHandler);
      let el = ReactDOM.findDOMNode(this);
      this.el = el;
    }
  }

  scrollHandler (event) {
    let el = this.el;
    var rect = el.getBoundingClientRect();

    let status = (
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );

    if (status) {
      window.removeEventListener('scroll', this.scrollHandler);
      this.setState({rendered: true});
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    return true;
    const doRender = this.props.renderCount !== nextProps.renderCount;
    const renderFlagChanged = this.state.rendered !== nextState.rendered;
    return renderFlagChanged || doRender;
  }

  isValid () {
    let children = React.Children.toArray(this.props.children);
    return children.reduce((valid, field) => {
      let isValid = this.refs[field.props.name].isValid();
      return valid && isValid;
    }, true);
  }

  getRenderElements () {
    if (this.props.optimize && !this.state.rendered) {
      return (
        <div></div>
      );
    } else {
      let children = React.Children.toArray(this.props.children);
      return React.Children.map(children, (Field) => {
        return React.cloneElement(Field, {
          ref: Field.props.name,
          key: Field.props.name,
          inline: this.props.inline
        });
      });
    }
  }

  render () {
    return (
      <form className={styles['react-form']} style={{minHeight: 55}}>
        {
          this.getRenderElements()
        }
      </form>
    );
  }
}
Form.defaultProps = {
  inline: false,
  optimize: false
};

Form.propTypes = {
  children: PropTypes.node,
  inline: PropTypes.bool,
  renderCount: PropTypes.number,
  optimize: PropTypes.bool
};

export default Form;
