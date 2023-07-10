import { writable } from 'svelte/store';

export const view = writable('');
export const token = writable('');
export const secret = writable('');
export const region = writable('US');
export const format = writable('json');
export const dataType = writable('');
export const files = writable([]);
export const aliases = writable({});
export const transformType = writable('');

/**
 * @type {import('svelte/store').Writable<{[key: string]: any}>}
 * @example { name: 'foo.csv', size: 123, lines: 234, format; "csv", data: [{},{},{}]}
 **/
export const dataSnippet = writable({});