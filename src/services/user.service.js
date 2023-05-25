const { createToken } = require('../auth/authFunctions');
const { userView } = require('../views');
const { createUservalidations } = require('./validations/userValidations');

const getById = async (id) => {
  const EXCLUDE_ATTRIBUTE = 'password';
  const foundUser = await userView.getById(id, EXCLUDE_ATTRIBUTE);

  if (!foundUser) return { type: 404, message: 'User does not exist' };
  return { type: null, message: foundUser };
};

const getUsers = async () => {
  const EXCLUDE_ATTRIBUTE = 'password';
  const allUsers = await userView.getAll(EXCLUDE_ATTRIBUTE);

  return { type: null, message: allUsers };
};

const getByEmail = async (email) => {
  const foundUser = await userView.getByEmail(email);
  return { type: null, message: foundUser };
};

const createUser = async (user) => {
  const error = await createUservalidations(user);
  if (error.type) return error;

  const newUser = await userView.create(user);
  const token = createToken({ email: newUser.email });

  return { type: null, message: token };
};

const deleteUser = async (tokenData) => {
  const user = await userView.getByEmail(tokenData.email);

  await userView.deleteUser(user.id);
  return { type: null, message: '' };
};

module.exports = {
  getById,
  createUser,
  getByEmail,
  getUsers,
  deleteUser,
};
