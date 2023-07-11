import got from 'got';


async function verifyTokenAndSecret(creds = {}) {
	const { token = '', secret = '', region = "US" } = creds;
	if (!token) return `missing token`;
	if (!secret) return `missing secret`;

	const tokenValid = await verifyToken(token, region);
	if (!tokenValid) return `invalid token`;

	const secretValid = await verifySecret(secret, region);
	if (!secretValid) return `invalid secret`;

	return 'credentials valid!';
}


async function verifyToken(token, region) {
	const URL = `https://decide.mixpanel.com/decide`
	try {
		const test = await got.get({
			url: URL,
			searchParams: {
				version: 1,
				token,
				distinct_id: "foo",
				lib: "iphone"
			},	
		});
		
		return true;


	}
	catch (err) {
		return false;
	}
}


async function verifySecret(secret, region) {
	const URL = `https://data${region === 'EU' ? '-eu' : ""}.mixpanel.com/api/2.0/export`
	try {
		const test = await got.get({
			url: URL,
			searchParams: {
				from_date: "2012-01-01", to_date: "2012-01-01", limit: 1
			},
			username: secret + ":",
			password: '',
		});

		if (test.statusCode === 200) return true;

	}
	catch (err) {
		return false;
	}

}

export default verifyTokenAndSecret;