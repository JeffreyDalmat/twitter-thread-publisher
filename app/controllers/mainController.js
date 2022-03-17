const { TwitterApi } = require('twitter-api-v2');


const mainController = {

	home: function (req, res) {

		if(req.session.user){
			res.redirect('/dashboard');
		}
		else{
			res.render('home');
		}

	},

	
};

module.exports = mainController;