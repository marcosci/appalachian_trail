<script>
	import { onMount, onDestroy, setContext } from 'svelte';
	import { mapbox, key } from '$lib/components/mapbox.js';

	setContext(key, {
		getMap: () => map
	});

	let map;
	let container;
	let accessToken = import.meta.env.VITE_MAPBOX_API_ACCESS_TOKEN;

	let viewState = {
		latitude: 34.6267,
		longitude:  -84.1939,
		zoom: 6.5,
		maxZoom: 15,
		minZoom: 4
	};

	onMount(() => {
		map = new mapbox.Map({
			accessToken: accessToken,
			container: map_base,
			interactive: true,
			style: 'mapbox://styles/marco-sciaini/clkpajzok00lx01qyccz69epq',
			center: [viewState.longitude, viewState.latitude],
			zoom: viewState.zoom,
			projection: 'globe',
			attributionControl: false,
			minZoom: viewState.minZoom,
			maxZoom: viewState.maxZoom
		});

		map.on('load', () => {

			// setup the viewport
			map.jumpTo({ 'center': [-71.60992408707565, 44.18894151289809], 'zoom': 14 });
			map.setPitch(30);
			
			map.addSource('trace', { type: 'geojson' });

			map.addLayer({
			'id': 'trace',
			'type': 'line',
			'source': 'trace',
			'paint': {
			'line-color': 'yellow',
			'line-opacity': 0.75,
			'line-width': 5
			}
			});
		});
	});

	onDestroy(() => {
		if (map) map.remove();
	});
</script>

<div id="map_base" class="w-full h-6/6 row-span-3" bind:this={container}>
	{#if map}
		<slot />
	{/if}
</div>

