const express = require('express');
const router = express.Router();

const mainController = require('./controllers/mainController');
const loginController = require('./controllers/loginController');

router.get('/', mainController.home);

router.get('/login', loginController.login);
router.get('/welcome', loginController.welcome);
router.get('/dashboard', loginController.dashboard);
router.get('/logout', loginController.logout);

module.exports = router;