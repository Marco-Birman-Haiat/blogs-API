const verifyLoginRequest = (req, _res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return next({ type: 400, message: 'Some required fields are missing' });
  return next();
};

module.exports = {
  verifyLoginRequest,
};
