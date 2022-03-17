/* eslint-disable no-undef */
const { TwitterApi } = require('twitter-api-v2');

const client = new TwitterApi({
    appKey: `${process.env.CONSUMER_KEY}`,
  appSecret: `${process.env.CONSUMER_SECRET}`
});

rwClient = client.readWrite


module.exports = client;