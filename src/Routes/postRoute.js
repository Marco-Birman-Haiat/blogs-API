const express = require('express');
const { validateJWT } = require('../middlewares/token');
const { blogPostController } = require('../controllers');

const postRouter = express.Router();

postRouter.post('/', validateJWT, blogPostController.createPost);
postRouter.get('/', validateJWT, blogPostController.getPosts);
postRouter.get('/:id', validateJWT, blogPostController.getPostById);
postRouter.put('/:id', validateJWT, blogPostController.updatePost);

module.exports = postRouter;