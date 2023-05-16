const express = require('express');
const { userController } = require('../controllers');
const { validateJWT } = require('../middlewares/token');

const userRouter = express.Router();

userRouter.post('/', userController.createUser);
userRouter.get('/', validateJWT, userController.getUsers);
userRouter.get('/:id', validateJWT, userController.getById);

module.exports = userRouter;
