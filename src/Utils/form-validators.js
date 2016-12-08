const NUMBER_ONLY_REGEXP = /^\d+$/;
const DECIMAL_REGEXP = /^[0-9]+(\.[0-9]{1,2})?$/;

function required (arg) {
  if (arg) arg = arg.trim();
  if (arg) return {valid: true, error: ''};

  return {valid: false, error: 'Field cannot be empty or spaces.'};
}

function number (arg = '') {
	if(NUMBER_ONLY_REGEXP.test(arg)) return {valid: true, error: ''};

	return {valid: false, error: 'Only numbers are allowed'};
}

function decimal (arg = '') {
	if(DECIMAL_REGEXP.test(arg)) return {valid: true, error: ''};

	return {valid: false, error: 'Invalid value'};
}

export default {
  required,
	number,
	decimal
};
