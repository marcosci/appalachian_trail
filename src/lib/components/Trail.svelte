<script>
	import { getContext } from 'svelte';
	import { key } from './mapbox.js';
    import {scrolly_state} from "$lib/components/mapbox.js";
	import at from "$data/at.geo.json";

	console.log(at);

	const { getMap } = getContext(key);
	const map = getMap();

	let scrollyState;

	scrolly_state.subscribe((value) => {
		scrollyState = value;
	});

	// save full coordinate list for later
	const coordinates = at.features[0].geometry.coordinates;

	console.log(coordinates[0]);

	// start by showing just the first coordinate
	at.features[0].geometry.coordinates = [coordinates[0]];


	$: if(scrollyState > 1){
		console.log(scrollyState);

		at.features[0].geometry.coordinates.push(coordinates[scrollyState]);
		map.getSource('trace').setData(at);
		map.panTo(coordinates[scrollyState]);
	}

</script>