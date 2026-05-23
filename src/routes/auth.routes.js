const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/auth.controllers');
const validateMiddlewares = require("../middlewares/validationMIddlewares");

router.post('/register',validateMiddlewares.registerUserValidationResult, authControllers.registerUser);

router.post('/login',validateMiddlewares.loginUserValidationResult, authControllers.loginUser);

router.post('/logout', authControllers.logoutUser);

module.exports = router;