const { Category } = require('../database/models');

const getAll = async () => Category.findAll();

const getById = async (id) => Category.findByPk(id);

const create = async (category) => Category.create(category);

module.exports = {
  getAll,
  getById,
  create,
};
