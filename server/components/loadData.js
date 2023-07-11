import mp from 'mixpanel-import';
import path from 'path';

/**
 * @param  {} file
 * @param  {import('../../types.ts').Config} config
 */
async function main(file, config) {
	const name = file.filename;
	const { token, secret, region, aliases, dataType, format, transformType } = config;
	/** @type {import('mixpanel-import').Data} */
	const filePath = path.resolve(file.filepath);


	/** @type {import('mixpanel-import').Creds} */
	const creds = { token, secret };
	if (aliases.groupKey) creds.groupKey = aliases.groupKey;
	delete aliases.groupKey;

	/** @type {import('mixpanel-import').Options} */
	const options = {
		aliases: flipKeysAndValues(aliases),
		recordType: dataType,
		region,
		transformFunc: (a) => a,
		tags: { "$source": "mixpanel-dnd" },
		streamFormat: format,
		logs: false,
		removeNulls: true,
		verbose: false,
		workers: 25,
		forceStream: true,
		compress: true,
		fixData: true,
		abridged: false,
	};

	const job = await mp(creds, filePath, options, false, false);
	job.filename = name


	return job;
}


function flipKeysAndValues(obj) {
	const ret = {};
	for (const key in obj) {
		ret[obj[key]] = key;		
	}
	return ret;
}

export default main;