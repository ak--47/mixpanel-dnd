#! /usr/bin/env node
import esMain from 'es-main';
import server from './server/server.js';

async function main() {
	server()
	console.log('disclaimer: this product is alpha\n\n')
	console.log('app is alive! visit...\n')
	console.log('\thttp://localhost:3000/\n')
	console.log('\n...when finished press CTRL+C to kill the local server')
}

export default main;

if (esMain(import.meta)) {
	main()
}