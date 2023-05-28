const { User } = require('../database/models');

const getAll = async (exclude) => {
  const excludeObject = { attributes: { exclude } };
  return User.findAll(excludeObject);
};

const getById = async (id, exclude) => {
  const excludeObject = { attributes: { exclude } };
  return User.findByPk(id, excludeObject);
};

const getByEmail = async (email) => User.findOne({ where: { email } });

const deleteUser = async (id) => User.destroy({ where: { id } });

const create = async (user) => User.create(user);

module.exports = {
  getById,
  getAll,
  getByEmail,
  deleteUser,
  create,
};
