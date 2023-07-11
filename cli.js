#! /usr/bin/env node
process.env.NODE_ENV='local' //todo: don't do this here...
import esMain from 'es-main';
import server from './server/server.js';

async function main() {
	server()
	console.log('disclaimer: this product is alpha\n\n')
	console.log('app is alive! visit...\n')
	console.log('\thttp://localhost:3000/\n')
	console.log('\n...when finished press CTRL+C to kill the local server\n')
}

export default main;

if (esMain(import.meta)) {
	main()
}