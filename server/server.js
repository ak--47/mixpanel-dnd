import Fastify from "fastify";
import { fastifyStatic } from "@fastify/static";
import path from "path";
// import bunyan from "bunyan";
// const log = bunyan.createLogger({name: "mixpanel-dnd", level: "info"});
const app = Fastify({
	logger: true,
});

// COMPONENTS
import verifyCreds from "./components/verifyCreds.js";

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

app.route({
	method: ['POST'],
	url: '/verify',
	handler: async (request, reply) => {		
		const result = await verifyCreds(request.body);
		reply.send({ status: result });
	}
})


/**
 * Run the server!
 */
async function start() {
	try {
		app.log.info("APP ALIVE!");
		await app.listen({ port: 3000 });
	} catch (err) {
		app.log.error(`CRASH!\n\n${err.toString()}`);
		app.log.error(err);
		process.exit(1);
	}
}

start();

export default start;