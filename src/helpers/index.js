const passwordValidator = (password) => {
  let message = '';
  if (password.length < 5) {
    message = message.concat('atleast 5 characters,');
  }
  if (!/\d/.test(password)) {
    message = message.concat('one digit,');
  }
  if (!/[A-Z]/.test(password)) {
    message = message.concat('one capital letter');
  }
  return message;
};

export { passwordValidator };
