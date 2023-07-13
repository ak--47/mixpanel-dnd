import dotenv from 'dotenv';
import { execSync } from "child_process";
import "expect-puppeteer";
import { jest } from '@jest/globals';
dotenv.config();
const timeout = 60000;
jest.setTimeout(300000);


const token = process.env.MIXPANEL_TOKEN;
const secret = process.env.MIXPANEL_SECRET;
const project = process.env.MIXPANEL_PROJECT;

beforeAll(async () => {
	await page.goto(URL, { waitUntil: 'domcontentloaded' });
});


test('tests work', () => {
	expect(true).toBe(true);
});

test('page loads', async () => {
	const title = await page.title();	
	expect(title).toBe('Mixpanel Drag + Drop');
}, timeout);

// test('nav works', async () => {
// 	let title;
// 	const extract = await page.$('li#extract');
// 	const transform = await page.$('li#transform');
// 	const load = await page.$('li#load');
	
// 	await transform.click();
// 	title = await page.$('div.title');
// 	expect(title).toMatchTextContent('Field Mappings');

// 	// await load.click();
// 	// title = await page.$('div.title');
// 	// expect(title).toMatchTextContent('Project Info');

// 	// await extract.click();
// 	// title = await page.$('div.title');
// 	// expect(title).toMatchTextContent('Upload File(s)');
	
// })

// // ???
// test('drag and drop', async () => {
// 	await page.click('li#upload');
// 	const fileInput = await page.$(
// 		"input[type=file]"
// 	);
// 	await fileInput.uploadFile("./testData/bar.ndjson");
// 	// await page.waitForSelector('table');
// 	const table = await page.$('table');
// 	expect(await page.$('table')).toBeTruthy();
// }, timeout);


afterAll(async () => {
	execSync('npm run prune');
});