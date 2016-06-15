# simple-react-forms
Simple form implementation using react which supports the following

* Multiple input types (select, textarea, email, number etc.,)
* Validations
* Custom styling
* Showing help text on focus of control
* Custom input type support (react-select)
* On-demand rendering of the controls. This greatly improves the performance if the form has many field controls.

###Installation

```
  npm install --save simple-react-forms
  
  // ES6
  import {Form, Field} from 'simple-react-forms';
```

###Basic Usage

```
import {Form, Field} from 'simple-react-forms';
import React, {Component} from 'react';

class SimpleFormDemo extends Component {
  onClickHandler () {
    console.log(this.refs['simpleForm'].getFormValues());
  }
  render () {
    return (
    <div>
      <Form ref='simpleForm'>
          <Field
            name='city'
            label='Enter City name'
            type='text'
          />
      </Form>
      <button onClick='this.onClickHandler'>Submit</button>
    </div>
      
    );
  }
}
```

**Note**: `ref` for `Form` element is a mandatory prop. Since we have to get the entered form values through `getFormValues` method exposed on `Form` instance.
Check the `onClickHandler` in the example above for the sample usage of `getFormValues` method. For example, In the above example calling `getFormValues` after entering `Bangalore` 
in the input field will return the following object.

```
{
  'city': 'Bangalore'
}
```

### Using Validation
```
  <Form ref='simpleForm'>
          <Field
            name='city'
            label='Enter City name'
            type='text'
            validators={[
            'required',
            (value) => {
              if (isCityServicable(value)) {
                return {valid: true}
              }
              else {
                return {valid: false, error: 'Entered city is not servicable'}
              }
            }
            ]}
          />
      </Form>
```

`validators` props takes array of validation condition. For the basic validation checks like `required`, you can just pass `required` as string. And for custom validations, you can pass function as shown in the example above. Validation functions are executed based on its order in validators array. If a validation function returns false for `valid` key in return object, then there is no further check and `error` message is shown on the field.

Finally to check the form validity, call the method `isValid()` exposed on Form instance. So ideally you have to first check for validity of the form using `isValid()` and then `getFormValues()` should be called to get the values. Check below for usage.

```
  if(**this.refs['simpleForm'].isValid()**){
    this.submitData(this.refs['simpleForm'].getFormValues());
  }
```

