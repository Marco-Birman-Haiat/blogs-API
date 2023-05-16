const { createToken } = require('../auth/authFunctions');
const { getByEmail } = require('./user.service');

const loginVerify = async (loginData) => {
  const { email, password } = loginData;

  const user = await getByEmail(email);

  if (!user || password !== user.password) {
    return { type: 400, message: 'Invalid fields' };
  }

  const token = createToken({ email: user.dataValues.email });

  return { type: null, message: token };
};

module.exports = {
  loginVerify,
};
