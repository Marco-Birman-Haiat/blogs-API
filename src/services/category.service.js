const { Category } = require('../models');
const { categoryCreateValidation } = require('./validations/categoryValidations');

const createCategory = async (category) => {
  const error = categoryCreateValidation(category);
  if (error.type) return { type: error.type, message: error.message };

  const createdCategory = await Category.create(category);
  return { type: null, message: createdCategory };
};

const getCategories = async () => Category.findAll();

module.exports = {
  createCategory,
  getCategories,
};
