const { validateCategoryIds } = require('./categoryValidations');
const { createBlogPostSchema } = require('./schemas');

const postCreateValidation = async (post) => {
  const { title, content, categoryIds } = post;
  const { error: schemaError } = createBlogPostSchema.validate({ title, content, categoryIds });
  console.log(schemaError);
  if (schemaError) return { type: 400, message: 'Some required fields are missing' };

  const categoryError = await validateCategoryIds(categoryIds);
  if (categoryError.type) return categoryError;

  return { type: null, message: '' };
};

module.exports = {
  postCreateValidation,
};
