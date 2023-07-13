/** @type {import('jest-environment-puppeteer').JestPuppeteerConfig} */
module.exports = {
	launch: {
		headless: 'new',
		devtools: false,
		dumpio: false,
		// slowMo: 1000,
		// debuggingPort: 1337,
		
	},
	server: {
		command: "NODE_ENV=test node ./server/server.js",
		port: 3000,
		usedPortAction: 'error'
	},
	browserContext: "incognito",
	exitOnPageError: false,
};