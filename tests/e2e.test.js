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

// ???
test('drag and drop', async () => {
	await page.click('li#upload');
	const fileInput = await page.$(
		"input[type=file]"
	);
	await fileInput.uploadFile("./testData/bar.ndjson");
	await page.waitForSelector('table');
	expect(await page.$('table')).toBeTruthy();
}, timeout);


afterAll(async () => {
	execSync('npm run prune');
});