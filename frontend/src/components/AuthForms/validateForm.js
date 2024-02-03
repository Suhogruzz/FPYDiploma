const validateUsername = (username) => {
  const usernamePattern = /^[a-zA-Z][a-zA-Z0-9]/g;

  if (!usernamePattern.test(username)) {
    return {
      ok: false,
      message: 'Username can include only latin characters and numbers',
    };
  }

  if (username.length < 4 || username.length > 20) {
    return {
      ok: false,
      message: 'Username must be between 4 and 20 characters long',
    };
  }

  return {
    ok: true,
  };
};

const validatePassword = (password) => {
  const numberPattern = /\d/;
  const specialLettersPattern = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;

  if (password.length < 6) {
    return {
      ok: false,
      message: 'Password length should be 6 symbols or more',
    };
  }

  if (password === password.toLowerCase()) {
    return {
      ok: false,
      message: 'Password should contains uppercase letter',
    };
  }

  if (!numberPattern.test(password)) {
    return {
      ok: false,
      message: 'Password should contains number',
    };
  }

  if (!specialLettersPattern.test(password)) {
    return {
      ok: false,
      message: 'Password should contains special character',
    };
  }

  return {
    ok: true,
  };
};

export { validateUsername, validatePassword };
