const { createToken } = require('../auth/authFunctions');
const { userView } = require('../views');

const loginVerify = async (loginData) => {
  const { email, password } = loginData;
  const user = await userView.getByEmail(email);

  if (!user || password !== user.password) {
    return { type: 400, message: 'Invalid fields' };
  }

  const token = createToken({ email: user.dataValues.email });
  return { type: null, message: token };
};

module.exports = {
  loginVerify,
};
