// const { categoryCreateSchema } = require('./schemas');

const { Category } = require('../../database/models');

const categoryCreateValidation = (category) => {
  // const { error } = categoryCreateSchema.validate(category);
  // console.log(error);
  if (!category.name) return { type: 400, message: '"name" is required' };

  return { type: null, message: '' };
};

const validateCategoryIds = async (categoryIds) => {
  const idsFoundArray = await Promise.all(categoryIds.map(async (id) => {
    const category = await Category.findByPk(id);
    return category;
  }));

  if (idsFoundArray.some((queryResult) => !queryResult)) {
    return { type: 400, message: 'one or more "categoryIds" not found' };
  }
  return { type: null, message: '' };
};

module.exports = {
  categoryCreateValidation,
  validateCategoryIds,
};
