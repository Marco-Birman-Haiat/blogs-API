const { createToken } = require('../auth/authFunctions');
const { User } = require('../models');
const { createUservalidations } = require('./validations/userValidations');

const getById = async (id) => User.findByPk(id, { attributes: { exclude: 'password ' } });

const getUsers = async () => User.findAll({ attributes: { exclude: 'password ' } });

const getByEmail = async (email) => User.findOne({ where: { email } });

const createUser = async (user) => {
  const { displayName, email, password, image } = user;

  const error = await createUservalidations(user);
  if (error.type) return error;

  const emailExists = await getByEmail(email);
  if (emailExists) return { type: 409, message: 'User already registered' };

  const newUser = await User.create({ displayName, email, password, image });
  const token = createToken({ email: newUser.email });
  return { type: null, message: token };
};

module.exports = {
  getById,
  createUser,
  getByEmail,
  getUsers,
};
