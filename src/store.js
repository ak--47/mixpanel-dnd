import { writable } from 'svelte/store';

export const view = writable('');
export const token = writable('');
export const secret = writable('');
export const region = writable('US');
export const format = writable('json');
export const files = writable([]);