const express = require('express');
const { loginController } = require('../controllers');
const { verifyLoginRequest } = require('../middlewares/login');

const loginRouter = express.Router();

loginRouter.post('/', verifyLoginRequest, loginController);

module.exports = loginRouter;
