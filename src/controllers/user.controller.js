const { userService } = require('../services');

const createUser = async (req, res) => {
  const signUpResult = await userService.createUser(req.body);
  if (signUpResult.type) {
    return res.status(signUpResult.type).json({ message: signUpResult.message });
  }

  return res.status(201).json({ token: signUpResult.message });
};

const getUsers = async (_req, res) => {
  const allUsers = await userService.getUsers();
  return res.status(200).json(allUsers.message);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const result = await userService.getById(id);
  if (result.type) return res.status(result.type).json({ message: result.message });

  return res.status(200).json(result.message);
};

const deleteUser = async (req, res) => {
  const { data: { email } } = req.payload;
  const deletion = await userService.deleteUser({ email });

  return res.status(204).json(deletion.message);
};

module.exports = {
  createUser,
  getUsers,
  getById,
  deleteUser,
};
