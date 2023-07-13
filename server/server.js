import Fastify from "fastify";
import { fastifyStatic } from "@fastify/static";
import { fastifyMultipart } from "@fastify/multipart";
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.resolve(path.dirname(__filename), "..");
// console.log(root)

// import bunyan from "bunyan";
// const log = bunyan.createLogger({name: "mixpanel-dnd", level: "info"});
const app = Fastify({
	logger: process.env.NODE_ENV === 'dev' ? true : false,
});

// COMPONENTS
import verifyCreds from "./components/verifyCreds.js";
import loadData from "./components/loadData.js";

// STATIC ASSETS
app.register(fastifyStatic, { root: path.resolve(__dirname, "dist") });
app.register(fastifyMultipart);

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
});

app.route({
	method: ['POST'],
	url: '/load',
	handler: async (request, reply) => {
		const limits = {
			fieldNameSize: Infinity, // Max field name size in bytes
			fieldSize: Infinity,     // Max field value size in bytes
			fields: Infinity,         // Max number of non-file fields
			fileSize: Infinity,  // For multipart forms, the max file size in bytes
			files: Infinity,           // Max number of file fields
			headerPairs: Infinity,  // Max number of header key=>value pairs
			parts: Infinity         // For multipart forms, the max number of parts (fields + files)
		};
		const config = JSON.parse(request.headers['x-job-configuration']);
		const files = await request.saveRequestFiles({
			tmpdir: path.resolve(__dirname, "server/tmp/"), preservePaths: false, limits
		});
		const results = [];

		for await (const file of files) {
			const result = await loadData(file, config);
			results.push(result);
		}

		reply.send({ results });
	}
});




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
		if (process.env.NODE_ENV !== 'prod') {
			console.log('YIKES!\nwe failed to start the server... this is probably due to port 3000 being in use. message is:\n');
			console.log(err?.message || err);
			console.log('\n\nplease free up port 3000 and try again.\n\nhint: you can try\nnpx --yes kill-port 3000\n\n');
			process.exit(1);
		}
	}
	return app;
}
if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'test') {
	start();
}

export default start;