import dotenv from 'dotenv';
import { execSync } from "child_process";
dotenv.config();
const timeout = 60000;

const token = process.env.MIXPANEL_TOKEN;
const secret = process.env.MIXPANEL_SECRET;
const project = process.env.MIXPANEL_PROJECT;

describe('do tests work?', () => {
	test('a = a', () => {
		expect(true).toBe(true);
	});
});
