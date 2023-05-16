const { loginService } = require('../services');

module.exports = async (req, res) => {
  try {
    const loginAttempt = await loginService.loginVerify(req.body);

    if (loginAttempt.type) {
      return res.status(loginAttempt.type).json({ message: loginAttempt.message });
    }

    res.status(200).json({ token: loginAttempt.message });
  } catch (e) {
    return res.status(500).json({ message: 'internal error', error: e.message });
  }
};
