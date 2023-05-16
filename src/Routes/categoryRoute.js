const express = require('express');
const { categoryController } = require('../controllers');
const { validateJWT } = require('../middlewares/token');

const categoryRouter = express.Router();

categoryRouter.post('/', validateJWT, categoryController.createCategory);
categoryRouter.get('/', validateJWT, categoryController.getCategories);

module.exports = categoryRouter;
