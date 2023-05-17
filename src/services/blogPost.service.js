const { BlogPost, sequelize, PostCategory, User } = require('../models');
const { postCreateValidation } = require('./validations/postValidations');

const executeCreatePostTransaction = async (postData, categoryIds) => {
  const result = await sequelize.transaction(async (t) => {
    const newPost = await BlogPost.create(postData, { transaction: t });
    const postCategoryInsertData = categoryIds.map((id) => (
      { categoryId: id, postId: newPost.id }));
    await PostCategory.bulkCreate(postCategoryInsertData, { transaction: t, underscored: true });

    return newPost;
  });
  return result;
};

const createPost = async (post) => {
  const { title, content, categoryIds } = post;
  const error = await postCreateValidation(post);
  if (error.type) return error;
  
  const author = await User
    .findOne({ where: { email: post.email }, attributes: ['id'] });

  const userId = author.dataValues.id;
  
  const postData = { title, content, userId, published: new Date(), updated: new Date() };

  const createPostTransaction = await executeCreatePostTransaction(postData, categoryIds);

  return { type: null, message: createPostTransaction };
};

module.exports = {
  createPost,
};