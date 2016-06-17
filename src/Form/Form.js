import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

class Form extends Component {
  constructor (props) {
    super();
    this.state = {
      rendered: !props.onDemand
    };
    this.scrollHandler = this.scrollHandler.bind(this);
    this.renderAsync = this.renderAsync.bind(this);
  }

  componentWillUnmount () {
    if (this.props.onDemand) window.removeEventListener('scroll', this.scrollHandler);
  }

  getFormValues () {
    let children = React.Children.toArray(this.props.children);
    return children.reduce((prev, field) => {
      return {...prev, [field.props.name]: this.refs[field.props.name].getValue()};
    }, {});
  }

  componentDidMount () {
    if (this.props.onDemand) {
      window.requestIdleCallback && window.requestIdleCallback(this.renderAsync);
      window.addEventListener('scroll', this.scrollHandler);
      let el = ReactDOM.findDOMNode(this);
      this.el = el;
    }
  }

  renderAsync (deadline) {
    let rendered;
    if (deadline.timeRemaining() > 0 && this.state.rendered === false) {
      console.log('rendering in async');
      window.removeEventListener('scroll', this.scrollHandler);
      this.setState({rendered: true});
      rendered = true; // Can't depend on react state since its async
    }
    if (!rendered && !this.state.rendered) {
      console.log('second async setting');
      window.requestIdleCallback(this.renderAsync);
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
      console.log('rendering in scrollHandling');
      window.removeEventListener('scroll', this.scrollHandler);
      this.setState({rendered: true});
    }
  }

  isValid () {
    let children = React.Children.toArray(this.props.children);
    return children.reduce((valid, field) => {
      let isValid = this.refs[field.props.name].isValid();
      return valid && isValid;
    }, true);
  }

  getRenderElements () {
    if (this.props.onDemand && !this.state.rendered) {
      return (
        <div></div>
      );
    } else {
      let children = React.Children.toArray(this.props.children);
      return React.Children.map(children, (Field) => {
        return React.cloneElement(Field, {
          ref: Field.props.name,
          key: Field.props.name
        });
      });
    }
  }

  render () {
    return (
      <form>
        {
          this.getRenderElements()
        }
      </form>
    );
  }
}
Form.defaultProps = {
  onDemand: false
};

Form.propTypes = {
  children: PropTypes.node,
  onDemand: PropTypes.bool
};

export default Form;
