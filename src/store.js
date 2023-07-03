import { writable } from 'svelte/store';

export const view = writable('project');
export const token = writable('');
export const secret = writable('');
export const region = writable('US');