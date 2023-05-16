const { userService } = require('../services');

const createUser = async (req, res) => {
  const signUpResult = await userService.createUser(req.body);
  if (signUpResult.type) {
    return res.status(signUpResult.type).json({ message: signUpResult.message });
  }

  return res.status(201).json({ token: signUpResult.message });
};

const getUsers = async (_req, res) => {
  const users = await userService.getUsers();
  return res.status(200).json(users);
};

module.exports = {
  createUser,
  getUsers,
};
