import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Form, Field} from '../src';
class FormDemo extends Component {
  constructor () {
    super();
    let fields = [];
    for (var i = 0; i < 200; i++) {
      fields.push(i + ' - Field');
    }
    this.state = { fields };
  }
  render () {
    return (
      <div>
        <h2>Basic Usage</h2>
        <p>
          Simple usage of Form and Field is given below.
        </p>
        <Form ref='filterForm'>
          <Field
            name='sampleField'
            label='Enter name'
            type='text'
            help='Give your help text here'
            inline
            highlight
            style={{
              width: '80%'
            }}
            validators={['required']}
          />
       </Form>
       {
         this.state.fields.map((item) => {
           return (
             <Form onDemand key={item}>
               <Field
                 name={item}
                 label={item}
               />
            </Form>
           );
         })
       }
     </div>
    );
  }
}

ReactDOM.render(<FormDemo />, document.getElementById('root'));
