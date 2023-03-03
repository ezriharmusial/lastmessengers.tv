<script>
	import { player, skipTo } from './mediaplayer/mediaplayer';

	import TrackMediaObject from './TrackMediaObject.svelte';

	export let tracks

	export function handleButtonKeys(event, order) {
		event.preventDefault()
		if(event.key === "Enter" || event.key === "Space"){
 		   	// do something here
			console.log('event.key', event.key, 'pressed')
			skipTo(order)
		}

	}

</script>

<div id="track-list">

	<header class="sticky top-0 text-xl bg-white dark:bg-black font-semibold mb-0 p-3">
		<h3><a href="/unity-album-2022/" aria-label="Unity Album info">Unity Album 2022</a> - Track List</h3>
	</header>
	{#each tracks as track}
	<div role="button" class="Track cursor-pointer {track.frontmatter?.bgColor} {track.frontmatter?.color}" on:keydown={(event) => handleButtonKeys(event, track.frontmatter?.order)} on:click={() => {skipTo(track.frontmatter?.order)}}>
		<TrackMediaObject track={track.frontmatter} />
	</div>
	{/each}
</div>