const { categoryView } = require('../views');
const { categoryCreateValidation } = require('./validations/categoryValidations');

const createCategory = async (category) => {
  const error = categoryCreateValidation(category);
  if (error.type) return { type: error.type, message: error.message };

  const createdCategory = await categoryView.create(category);
  return { type: null, message: createdCategory };
};

const getById = async (id) => categoryView.getById(id);

const getCategories = async () => categoryView.getAll();

module.exports = {
  createCategory,
  getCategories,
  getById,
};
