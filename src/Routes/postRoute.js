const express = require('express');
const { validateJWT } = require('../middlewares/token');
const { blogPostController } = require('../controllers');

const postRouter = express.Router();

postRouter.post('/', validateJWT, blogPostController.createPost);
postRouter.get('/', validateJWT, blogPostController.getPosts);

module.exports = postRouter;