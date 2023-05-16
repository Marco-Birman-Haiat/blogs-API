const { User } = require('../models');

const getById = async (id) => {
  const user = await User.findByPk(id);
  return user;
};

const getByEmail = async (email) => User.findOne({ where: { email } });

const createUser = async (user) => {
  const { fullName, email, password, image } = user;
  const newUser = await User.create({ fullName, email, password, image });

  return newUser;
};

module.exports = {
  getById,
  createUser,
  getByEmail,
};
