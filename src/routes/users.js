const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');

//Sign up
router.get('/signup', userController.signup);
router.get('/store/protected-page', userController.storedUsers);
router.post('/store', userController.store);

//Login
router.get('/login', userController.show);
router.post('/login', userController.login);




module.exports = router;
