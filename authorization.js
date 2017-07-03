'use strict';

const request = require('request-promise');

module.exports = (code) => {
	console.log('Authorzation was called');

	const clientId = process.env.SLACK_CLIENT_ID;
	const clientSecret = process.env.SLACK_CLIENT_SECRET;

	const oauthURL = 'https://slack.com/api/oauth.access?' +
						'client_id=' + clientId + '&' +
						'client_secret=' + clientSecret + '&' +
						'code=' + code;
	console.log(oauthURL);					

	const options = {
		url : oauthURL,
		json : true,
	};
	return request(options)
			.then((response) => {
				var keys = Object.keys(response);
				console.log(keys[0]);
				for (var key in keys) {
					console.log(' name=' + key + ' value=' + keys[key]);
 				}

				console.log(response.access_token);
				console.log(response.scope);
			})
			.catch((error) => error);
}	