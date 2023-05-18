const { Op } = require('sequelize');
const { BlogPost, sequelize, PostCategory, User, Category } = require('../models');
const { postCreateValidation, updatePostValidation,
  postDeleteValidation } = require('./validations/postValidations');

const executeCreatePostTransaction = async (postData, categoryIds) => {
  const result = await sequelize.transaction(async (t) => {
    const newPost = await BlogPost.create(postData, { transaction: t });
    const postCategoryInsertData = categoryIds.map((id) => (
      { categoryId: id, postId: newPost.id }));
    await PostCategory.bulkCreate(postCategoryInsertData, { transaction: t });

    return newPost;
  });
  return result;
};

const getPosts = async () =>
  BlogPost.findAll({ 
    attributes: { exclude: ['true'] },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' },
    ],
  });

const getPostById = async (id) =>
  BlogPost.findByPk(
    id,
    {
      attributes: { exclude: ['true'] },
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories' },
      ],
    },
  );

const searchPosts = async (searchTerm) => {
  const foundPosts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories' },
    ],
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${searchTerm}%` } },
        { content: { [Op.like]: `%${searchTerm}%` } },
      ],
    },
  });
  return { type: null, message: foundPosts };
};

const updatePost = async (userEmail, postData) => {
  const error = await updatePostValidation(userEmail, postData);
  if (error.type) return error;

  const { id, title, content } = postData;
  const valuesToUpdate = { title, content };
  await BlogPost.update(valuesToUpdate, { where: { id } });

  const updatedPost = await BlogPost.findByPk(id, { 
    attributes: { exclude: ['true'] },
    include: [{ model: Category, as: 'categories' }],
  });
  return { type: null, message: updatedPost };
};

const createPost = async (post) => {
  const { title, content, categoryIds, email } = post;
  const error = await postCreateValidation(post);
  if (error.type) return error;
  
  const author = await User
    .findOne({ where: { email }, attributes: ['id'] });

  const userId = author.dataValues.id;
  
  const postData = { title, content, userId, published: new Date(), updated: new Date() };

  const createPostTransaction = await executeCreatePostTransaction(postData, categoryIds);

  return { type: null, message: createPostTransaction };
};

const deletePost = async (postId, userEmail) => {
  const error = await postDeleteValidation(postId, userEmail);
  if (error.type) return error;

  const result = await BlogPost.destroy({ where: { id: postId } });
  return { type: null, message: result };
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  searchPosts,
};