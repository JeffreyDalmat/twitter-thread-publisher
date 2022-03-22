const express = require('express');
const router = express.Router();

const mainController = require('./controllers/mainController');
const loginController = require('./controllers/loginController');
const tweetController = require('./controllers/tweetController');

router.get('/', mainController.home);

router.get('/login', loginController.login);
router.get('/welcome', loginController.welcome);
router.get('/dashboard', loginController.dashboard);
router.get('/logout', loginController.logout);

router.post('/posttweet', tweetController.postTweet);

module.exports = router;