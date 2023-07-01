import Fastify from "fastify";
import { fastifyStatic } from "@fastify/static";
import path from "path";
import bunyan from "bunyan";
const log = bunyan.createLogger({name: "mixpanel-dnd", level: "info"});

const app = Fastify({
	logger: log,
});

// STATIC ASSETS
app.register(fastifyStatic, { root: path.resolve("./dist") });

// API ROUTES
app.route({
	method: ['GET', 'POST'],
	url: '/ping',
	handler: async (request, reply) => {
		reply.send({ status: 'pong' });
	}
});


/**
 * Run the server!
 */
async function start() {
	try {
		log.info("APP ALIVE!");
		await app.listen({ port: 3000 });
	} catch (err) {
		log.error(`CRASH!\n\n${err.toString()}`);
		app.log.error(err);
		process.exit(1);
	}
}

start();

export default start;