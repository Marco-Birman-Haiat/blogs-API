const { verifyToken } = require('../auth/authFunctions');

const validateJWT = (req, res, next) => {
  const { authorization: token } = req.headers;
  if (!token) return next({ type: 401, message: 'Token not found' });

  try {
    const payload = verifyToken(token);
    req.payload = payload;
    next();
  } catch (e) {
    return next({ type: 401, message: 'Expired or invalid token' });
  }
};

module.exports = {
  validateJWT,
};