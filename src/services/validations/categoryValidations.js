// const { categoryCreateSchema } = require('./schemas');

const categoryCreateValidation = (category) => {
  // const { error } = categoryCreateSchema.validate(category);
  // console.log(error);
  if (!category.name) return { type: 400, message: '"name" is required' };

  return { type: null, message: '' };
};

module.exports = {
  categoryCreateValidation,
};
