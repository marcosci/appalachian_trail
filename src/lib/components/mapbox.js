// ./stores.js for map
import mapbox from 'mapbox-gl';
import { writable } from 'svelte/store';

const key = Symbol();

export const scrolly_state = writable(0);

export { mapbox, key };
