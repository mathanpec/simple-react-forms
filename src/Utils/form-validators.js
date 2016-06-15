function required (arg) {
  if (arg) arg = arg.trim();
  if (arg) return {valid: true, error: ''};

  return {valid: false, error: 'Field cannot be empty or spaces.'};
}

export default {
  required
};
