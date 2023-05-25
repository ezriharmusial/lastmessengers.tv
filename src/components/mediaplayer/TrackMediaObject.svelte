<script lang="ts">
	import { player } from "./mediaplayer/mediaplayer";
	import { getArtistImage, type Media } from "../lib/stores/data";
    import { fade } from "svelte/transition";

    export let track:Media
</script>

{#if track}
<div class="transition-colors duration-700  bg-white text-black hover:bg-slate-200/50 dark:bg-black dark:text-white dark:hover:bg-slate-800/50 py-2 px-1 { track.order == $player.track?.order ? $player.track?.bgColor + ' ' + $player.track?.color : ''}">
    <article class="media flex items-center sm:text-md lg:text-2xl" in:fade>
        {#if track.order == $player.track?.order}
        <figure class="w-4 h-4 mx-2 lg:w-5 lg:h-5 lg:mx-4">
		    {#if !$player.playing}
		    <svg id="play-icon" width="19"viewBox="0 0 31 37">
			    <path fill-rule="evenodd" clip-rule="evenodd" d="M29.6901 16.6608L4.00209 0.747111C2.12875 -0.476923 0.599998 0.421814 0.599998 2.75545V33.643C0.599998 35.9728 2.12747 36.8805 4.00209 35.6514L29.6901 19.7402C29.6901 19.7402 30.6043 19.0973 30.6043 18.2012C30.6043 17.3024 29.6901 16.6608 29.6901 16.6608Z"/>
		    </svg>
		    {/if}

		    {#if $player.playing}
		    <svg id="pause-icon" width="13" height="23" viewBox="0 0 24 36">
			    <rect width="6" height="36" rx="3"/>
			    <rect x="18" width="6" height="36" rx="3"/>
		    </svg>
		    {/if}
        </figure>
        {:else}
        <p class="w-4 h-4 mx-2 lg:w-6 lg:h-6 lg:mx-4">
            <span class="hover:hidden">
                {(track.order < 10) ? "0" + track.order : track.order}
            </span>
		    <svg class="hidden hover:visible" id="play-icon" width="23" height="30" viewBox="0 0 31 37">
			    <path fill-rule="evenodd" clip-rule="evenodd" d="M29.6901 16.6608L4.00209 0.747111C2.12875 -0.476923 0.599998 0.421814 0.599998 2.75545V33.643C0.599998 35.9728 2.12747 36.8805 4.00209 35.6514L29.6901 19.7402C29.6901 19.7402 30.6043 19.0973 30.6043 18.2012C30.6043 17.3024 29.6901 16.6608 29.6901 16.6608Z"/>
		    </svg>
        </p>
        {/if}
        <figure class="relative w-11 lg:w-12 xl:w-14 mr-2 lg:mr-4">
            <img class="object-cover w-11 lg:w-12 xl:w-14 bg-gradient-to-br from-slate-900 to-black" alt="Track Cover" src="{track.image || getArtistImage(track.artist) || '/uploads/albumcovers/happysunofyah.jpg'}">
        </figure>
        <div class="flex-grow">
            <p class="title font-semibold w-max truncate overflow-hidden">
                {track.title}
            </p>
            <p class="subtitle w-max truncate overflow-hidden">
                by {track.artist}
            </p>
        </div>
    </article>
</div>
{/if}