const { TwitterApi } = require('twitter-api-v2');
// var twitter = require('twitter-text');
// twitter.autoLink(twitter.htmlEscape('#hello < @world >'));


const tweetController = {

	postTweet: async function (req, res) {

		const data = req.body.thread;

		const client = new TwitterApi({
			appKey: process.env.CONSUMER_KEY,
			appSecret: process.env.CONSUMER_SECRET,
			accessToken: req.session.user.accessToken,
			accessSecret: req.session.user.accessSecret,
		});

		// const verifiedTweet = twttr.txt.parseTweet(data);
		// console.log(verifiedTweet);
		const createdTweet = await client.v1.tweet(data);

		// const createdTweet = await client.v1.tweetThread([
		// 	data,
		// 	{ status: 'Twitter is a fantastic social network. Look at this:' },
		// 	'This thread is automatically made with twitter-api-v2 :D',
		// ]);
		console.log(createdTweet);
		res.json(createdTweet);
	}

};

module.exports = tweetController;