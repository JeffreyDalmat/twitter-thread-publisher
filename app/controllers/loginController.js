const client = require('../twitter');
const { TwitterApi } = require('twitter-api-v2');

const loginController = {

	login: async function (req, res, next) {

		try {

			const authInfos = await client.generateAuthLink(process.env.CALLBACK_URL);

			// Store informations in the session
			req.session.user = { authInfos };
			req.session.oauthToken = authInfos.oauth_token;
			req.session.oauthTokenSecret = authInfos.oauth_token_secret;
            
			if(req.session.oauthToken && req.session.oauthTokenSecret){
				res.redirect(authInfos.url); // Redirect to twitter authentication page
			}
            
			next();
		}
		catch (error) {
			next(error);
		}
	},
	welcome: async function (req, res, next) {

		// Mauvaise requête
		if (!req.query.oauth_token || !req.query.oauth_verifier) {
			res.status(400).render('error', { error: 'Mauvaise requête ou l\'accès vous a été refusé. Veuillez réessayer' });
			return;
		}

		const urlToken = req.query.oauth_token;
		const verifier = req.query.oauth_verifier;
		const savedToken = req.session.oauthToken;
		const savedSecret = req.session.oauthTokenSecret;

		if (!savedToken || !savedSecret || savedToken !== urlToken) {
			res.status(400).render('error', { error: 'OAuth token non reconnu ou invalide. Votre requête est probablement expirée. Veuillez recommencer l\'authentification' });
		}

		// Obtain the persistent tokens
		// Create a client from temporary tokens
		const temporaryClient = new TwitterApi({
			appKey: process.env.CONSUMER_KEY,
			appSecret: process.env.CONSUMER_SECRET,
			accessToken: urlToken,
			accessSecret: savedSecret,
		});

		try{
			const {accessToken, accessSecret, screenName, userId} = await temporaryClient.login(verifier);

			req.session.user = {
				accessToken,
				accessSecret,
				screenName,
				userId
			};
    
			res.redirect('/dashboard');
			next();
		}
		catch(error){
			next(error);
		}
	},
	dashboard: function(req, res) {
		res.render('dashboard');
	},

	logout: function(req, res){

		delete req.session.user;

		return res.redirect('/');
		
	}
};

module.exports = loginController;