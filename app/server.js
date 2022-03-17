require('dotenv').config();

// Requirements
const express = require('express');
const router = require('./router');
const path = require('path');
const session = require('express-session');
const userMiddleware = require('./middlewares/userMiddleware.js');

const server = express();
const port = process.env.PORT || 3000;

server.use(express.static(path.join(__dirname, '../public')));

server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, '../app/views'));

// Session
server.set('trust proxy', 1); // trust first proxy
server.use(session({
	secret: process.env.COOKIE_SECRET,
	cookie: { 
		maxAge: 3600 * 24 * 7// a week
	} 
}));

server.use(express.urlencoded({extended:true})); // Access to all informations in the body

server.use(userMiddleware);
server.use(router);

server.listen(port, () => {
	console.log(`listening on port ${port}`);
});

module.exports = server;