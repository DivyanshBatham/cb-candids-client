const passwordValidator = (password) => {
  let message = '';
  if (password.length < 5) {
    message = message.concat('atleast 5 characters');
  }
  if (!/\d/.test(password)) {
    message = message.concat(`${message.length > 1 ? ', one digit' : 'one digit'}`);
  }
  if (!/[A-Z]/.test(password)) {
    message = message.concat(`${message.length > 1 ? ', one capital letter' : 'one capital letter'}`);
  }
  return message;
};

const getBackgroundColor = (idx) => {
  const availableColors = ['3FBF3E1', '#FAEEE1', '#F3F9EC', '#FDE8EF'];
  const totalColors = availableColors.length;
  return { backgroundColor: availableColors[idx % totalColors] };
};

const currentPage = (pathname) => {
  if (pathname.indexOf('/post') !== -1) return false;
  if (pathname.indexOf('/login') !== -1) return false;
  if (pathname.indexOf('/register') !== -1) return false;
  if (pathname.indexOf('/verifyEmail') !== -1) return false;
  if (pathname.indexOf('/forgetPassword') !== -1) return false;
  if (pathname.indexOf('/resetPassword') !== -1) return false;
  if (pathname.indexOf('/verifyEmail') !== -1) return false;
  if (pathname.indexOf('/verifyEmail') !== -1) return false;
  return true;
};

const compareUser = (pathname) => {
  const currentLoggedInUser = localStorage.getItem('cb-username');
  const currentUserPage = pathname.split('/')[1];
  const currentUserProfile = pathname.split('/')[2];
  return (
    (currentUserPage === 'user' &&
      currentLoggedInUser !== currentUserProfile) ||
    currentUserPage === 'post'
  );
};

export { passwordValidator, getBackgroundColor, currentPage, compareUser };
