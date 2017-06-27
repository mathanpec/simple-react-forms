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
          <Field
            name='state'
            label='Enter State name'
            type='text'
          />
      </Form>
      <button onClick={this.onClickHandler.bind(this)}>Submit</button>
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
  'city': 'Chennai',
  'state': 'Tamilnadu'
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

`validators` props takes array of validation condition. For the basic validation checks like `required`, you can just pass `required` as string. And for custom validations, you can pass function as shown in the example above. Validation functions are executed based on its order in validators array. If a validation function returns `{valid: true}` then the check goes to next validation function. If it returns `{valid: false, error: 'Entered city is not serviceable'}` then the validation stops there and the error message is shown on the field.

Finally to check the form validity, call the method `isValid()` exposed on Form instance. So ideally you have to first check for validity of the form using `isValid()` and then `getFormValues()` should be called to get the values. Check below for usage.

```
  if(this.refs['simpleForm'].isValid()){
    this.submitData(this.refs['simpleForm'].getFormValues());
  }
```

### Using custom elements

There might be cases when you want to use some custom input controls like `react-select` as an input field. In those cases, that field needs to passed as `element` props. All the props necessary for that custom component can be passed directly to it. Make sure the controls you use supports onChange, onBlur and other basic props.

```
import {Form, Field} from 'simple-react-forms';
import React, {Component} from 'react';

class SimpleFormDemo extends Component {
  render () {
    let options = [{
      id: 'blr',
      label: 'Bangalore'
    }, {
      id: 'chn',
      label: 'Chennai'
    }];
    return (
    <div>
      <Form ref='simpleForm'>
          <Field
            name='city'
            label='Select City'
            element= {
              <Select
                options={options}
                valueAccessor={(selectedValue) => selectedValue.id}
              />
            }
          />
      </Form>
    </div>

    );
  }
}
```
###Advanced usage for performant behavior

`simple-react-forms` can be made performant in two ways as follows.
* By setting `onDemand` props as true for Form component. This will make the form component to just reserve the space for it if it is not in view port area and renders the actual form only when it comes in view area. Sample use case could be  rendering a editable table with large number of rows and each row is a form component with multiple fields.
* By setting `optimize` props as true on Field Component. On setting this props, Field Component will just render a simple text box and the actual field element will be rendered only on mouse over of the input. Sample use case is in case of large number of select boxes with large number of options for each of them. So rendering a simple text box first and changing them to select on mouse over gives huge performance boost.


###Methods on Form Component

Following methods are available on Form component instance. Check the examples above for the usage of this methods.

Method Name | Return Value
----------- | ------------
getFormValues| An object with field names and values as keys and values respectively
isValid| true or false

###Props on Form Component

Name | type | Required | Default Value | Description
---- | ---- | -------- | ------------- | -----------
onDemand | Boolean | false | false | If set to true, it just reserves space for the form element and renderes the actual form only when it comes to view area.

###Props on Field Component

Name | type | Required | Default Value | Description
---- | ---- | -------- | ------------- | -----------
name | string | true | | This is the unique identifier for the field inside form.
label| string| false| | Label to used for that field
value| string, bool, number| false| | Value of the field
defaultValue| string, bool, number| false| | initial value setting for the field
type| string| false| text| Type of the field. Currently text, textarea, select, radio and checkbox is supported. Custom input types like `react-select` is also supported. But that is through `element` prop
options| Array | false | | Options for Select and radio controls. It can either be like `[{text: 'Bangalore', value: 'bang'}]` or `['Bangalore', 'Chennai']`.
element| React Component or html elements|false|| This is for using custom input controls like `react-select`. Check the usage in **Using custom elements** section.
valueAccessor| function | false | | Field Component gets the value of the input field by listening on onChange event. In case of custom elements, onChange may recieve different arguments other than event object or the actual value. So In that case valueAccessor method is used to get the actual value that needs to be bind to the field. Check the usage in **Using custom elements** section.
validators| Array | false | | Used for validation.  Check the usage in **Using Validation** section.
help | String | false | | Used to show help text for fields on field focus
inline | Boolean | false | false | Setting it true will render an inline form with label, controls and help text in same line
onChange | function | false | | If you want to listen on change of field value
placeholder| String | false | | Just like any other placeholder :P
disabled | Boolean | false | false | Used to disable the field
style | Object | false | | Overrides the default root style of field. Sample use case id to give width in case if you want to have multiple fields in same line.
labelStyle | Object | false | | Overrides the default label style. Setting width color and other typical style values :)
controlStyle | Object | false | | Overrides the default input element style.
helpStyle | Object | false | | Overrides the default help text style.
optimize | Boolean | false | false | If set to true, renders a plain input of type text by default and renders the actual field element on hover.
