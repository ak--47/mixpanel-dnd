#! /usr/bin/env node
process.env.NODE_ENV = 'local'; //todo: don't do this here...
import esMain from 'es-main';
import server from './server/server.js';

// these don't do anything!
// process.on('SIGTERM', () => {
// 	console.log('... server closed');
// 	process.exit(0);

// });

// process.on('exit', () => {
// 	console.log('... server closed');
// 	process.exit(0);
// });

async function main() {
		await server();
		console.log(hero);
		console.log('by AK')
		console.log('\n\ndisclaimer: this product is alpha\n\n');
		console.log('app is alive! visit...\n');
		console.log('\thttp://localhost:3000/\n');
		console.log('\n...when finished press CTRL+C to kill the local server\n');	
}

export default main;

if (esMain(import.meta)) {
	main();
}

const hero = `


.               
._ _ *\\./._  _.._  _ |               
[ | )|/'\\[_)(_][ )(/,|               
         |                           
  .                   .    .         
 _|._. _. _    _.._  _|   _|._. _ ._ 
(_][  (_](_]  (_][ )(_]  (_][  (_)[_)
         ._|                      |  
`;