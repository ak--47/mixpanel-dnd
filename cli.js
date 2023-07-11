#! /usr/bin/env node
import esMain from 'es-main';
import server from './server/server.js';

async function main() {
	server()
	console.log('app is alive! visit:')
	console.log('http://localhost:3000/')
}

export default main;

if (esMain(import.meta)) {
	main()
		// .then(() => {
		// 	console.log(`\n\nhooray! all done!\n\n`);
		// }).catch((e) => {
		// 	console.log(`\n\nuh oh! something didn't work...\nthe error message is:\n\n\t${e.message}\n\n@\n\n${e.stack}\n\n`);

		// }).finally(() => {
		// 	console.log('\n\nhave a great day!\n\n');
		// 	process.exit(0);
		// });

}