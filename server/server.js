import Fastify from "fastify";
import { fastifyStatic } from "@fastify/static";
import { fastifyMultipart } from "@fastify/multipart";
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.resolve(path.dirname(__filename), "..");
const root = path.resolve(__dirname, "dist")
console.log(root)

// import bunyan from "bunyan";
// const log = bunyan.createLogger({name: "mixpanel-dnd", level: "info"});
const app = Fastify({
	logger: true //process.env.NODE_ENV === 'dev' ? true : false,
});

// COMPONENTS
import verifyCreds from "./components/verifyCreds.js";
import loadData from "./components/loadData.js";

// STATIC ASSETS
app.register(fastifyStatic, { root  });
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
			tmpdir: './server/tmp', preservePaths: false, limits
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
		process.exit(1);
	}
	return app;
}
if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'test') {
	start();
}

export default start;