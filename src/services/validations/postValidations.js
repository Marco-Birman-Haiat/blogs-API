const { validateCategoryIds } = require('./categoryValidations');
const { createBlogPostSchema, updateBlogPostSchema } = require('./schemas');
const { BlogPost, User } = require('../../models');

const postCreateValidation = async (post) => {
  const { title, content, categoryIds } = post;
  const { error: schemaError } = createBlogPostSchema.validate({ title, content, categoryIds });
  if (schemaError) return { type: 400, message: 'Some required fields are missing' };

  const categoryError = await validateCategoryIds(categoryIds);
  if (categoryError.type) return categoryError;

  return { type: null, message: '' };
};

const updatePostValidation = async (userEmail, postData) => {
  const { id, title, content } = postData;
  const { error: schemaError } = updateBlogPostSchema.validate({ title, content });
  if (schemaError) return { type: 400, message: 'Some required fields are missing' };
  
  const postToUpdate = await BlogPost.findByPk(id, {
    attributes: { exclude: ['true'] },
    include: [
      { model: User, as: 'user' },
    ],
  });

  const isAuthorCorrect = postToUpdate.user.email === userEmail;
  if (!isAuthorCorrect) return { type: 401, message: 'Unauthorized user' };
  return { type: null, message: '' };
};

module.exports = {
  postCreateValidation,
  updatePostValidation,
};
