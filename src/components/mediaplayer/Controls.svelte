<script>
	import { player, skip, toggleLyrics, playPause } from "./mediaplayer";
	import { artists } from "./data";
	import { toggleArtistInfo, toggleMenu, toggleShare, UI } from "./ui";
	import { fade } from "svelte/transition";

	$: artist = $artists.find(artist => $player.track?.artist == artist.title)
	export let state = "fullscreen"

</script>

<nav class="fixed bottom-5 left-0 right-0 control h-control-panel z-10 mx-auto px-5 lg:px-10 rounded-b-xl flex items-center text-center justify-center {$player.track?.color} {$player.track?.theme == 'dark' ? 'fill-white/75 stroke-white' : 'fill-black/35 stroke-black'} transition-opacity duration-700 opacity-0" class:opacity-100={!$player.playing || $UI.controls.visible}>
	<button id="tracklist" class="tracklist cursor-pointer mx-1 {$player.track?.bgColor} transition-colors duration-1000 opacity-75 hover:opacity-100 w-8 h-8  rounded-full" on:click={toggleMenu} >
		<svg class="w-6 h-6 m-1" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
			<path d="M7.5 7H24.5V5H7.5V7ZM7.5 12H24.5V10H7.5V12ZM24.5 12C26.433 12 28 10.433 28 8.5H26C26 9.32843 25.3284 10 24.5 10V12ZM7.5 10C6.67157 10 6 9.32843 6 8.5H4C4 10.433 5.567 12 7.5 12V10ZM24.5 7C25.3284 7 26 7.67157 26 8.5H28C28 6.567 26.433 5 24.5 5V7ZM7.5 5C5.567 5 4 6.567 4 8.5H6C6 7.67157 6.67157 7 7.5 7V5Z"/>
			<path d="M5 15C4.44772 15 4 15.4477 4 16C4 16.5523 4.44772 17 5 17V15ZM27 17C27.5523 17 28 16.5523 28 16C28 15.4477 27.5523 15 27 15V17ZM5 17H27V15H5V17Z"/>
			<path d="M5 20C4.44772 20 4 20.4477 4 21C4 21.5523 4.44772 22 5 22V20ZM27 22C27.5523 22 28 21.5523 28 21C28 20.4477 27.5523 20 27 20V22ZM5 22H27V20H5V22Z"/>
			<path d="M5 25C4.44772 25 4 25.4477 4 26C4 26.5523 4.44772 27 5 27V25ZM27 27C27.5523 27 28 26.5523 28 26C28 25.4477 27.5523 25 27 25V27ZM5 27H27V25H5V27Z"/>
		</svg>
	</button>

	<a class="artist cursor-pointer amplitude-repeat-song mx-1 pt-1 {$player.track?.bgColor} transition-colors duration-1000 opacity-75 hover:opacity-100 h-8 w-8  {$player.track?.theme == 'light' ? 'hover:bg-white/20 hover:text-black/20' : 'hover:bg-black/20 hover:text-white/20'} rounded-full"  class:text-yellow-400={$player.loop != 'no-repeat'}
		href="/artists/{artist?.slug}"
		title="Toggle Artist info">
		<svg class="h-6 w-6 m-auto" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM512 256c0 141.4-114.6 256-256 256S0 397.4 0 256S114.6 0 256 0S512 114.6 512 256zM256 272c39.8 0 72-32.2 72-72s-32.2-72-72-72s-72 32.2-72 72s32.2 72 72 72z"/></svg>
	</a>

	<!-- <button class="shuffle cursor-pointer amplitude-shuffle mx-1 pt-1 {$player.track?.bgColor} transition-colors duration-1000 opacity-75 hover:opacity-100 w-8 h-8  rounded-full" class:text-yellow-400={$player.shuffle}
		on:click={toggleShuffle}
		title={"Turn shuffle" + $player.shuffle ? "off" : "on"}
		aria-label={"Turn shuffle" + $player.shuffle ? "off" : "on"}>
		<svg class="w-5 h-4 m-1 pl-1" viewBox="0 0 28 26" xmlns="http://www.w3.org/2000/svg">
			<path d="M1 20C0.447715 20 0 20.4477 0 21C0 21.5523 0.447715 22 1 22V20ZM7.75736 19.2426L8.46447 19.9497H8.46447L7.75736 19.2426ZM20.2426 6.75736L19.5355 6.05025L19.5355 6.05025L20.2426 6.75736ZM27 5L27.7071 5.70711C28.0976 5.31658 28.0976 4.68342 27.7071 4.29289L27 5ZM27 21L27.7071 21.7071C28.0976 21.3166 28.0976 20.6834 27.7071 20.2929L27 21ZM1 4C0.447715 4 0 4.44772 0 5C0 5.55228 0.447715 6 1 6V4ZM7.75736 6.75736L8.46447 6.05025L7.75736 6.75736ZM20.2426 19.2426L20.9497 18.5355L20.2426 19.2426ZM10.4645 10.8787C10.855 11.2692 11.4882 11.2692 11.8787 10.8787C12.2692 10.4882 12.2692 9.85499 11.8787 9.46447L10.4645 10.8787ZM17.5355 15.1213C17.145 14.7308 16.5118 14.7308 16.1213 15.1213C15.7308 15.5118 15.7308 16.145 16.1213 16.5355L17.5355 15.1213ZM23.7071 0.292893C23.3166 -0.0976311 22.6834 -0.0976311 22.2929 0.292893C21.9024 0.683417 21.9024 1.31658 22.2929 1.70711L23.7071 0.292893ZM22.2929 8.29289C21.9024 8.68342 21.9024 9.31658 22.2929 9.70711C22.6834 10.0976 23.3166 10.0976 23.7071 9.70711L22.2929 8.29289ZM23.7071 16.2929C23.3166 15.9024 22.6834 15.9024 22.2929 16.2929C21.9024 16.6834 21.9024 17.3166 22.2929 17.7071L23.7071 16.2929ZM22.2929 24.2929C21.9024 24.6834 21.9024 25.3166 22.2929 25.7071C22.6834 26.0976 23.3166 26.0976 23.7071 25.7071L22.2929 24.2929ZM1 22H3.51472V20H1V22ZM8.46447 19.9497L20.9497 7.46446L19.5355 6.05025L7.05025 18.5355L8.46447 19.9497ZM24.4853 6H27V4H24.4853V6ZM20.9497 7.46446C21.8874 6.52678 23.1592 6 24.4853 6V4C22.6288 4 20.8483 4.7375 19.5355 6.05025L20.9497 7.46446ZM3.51472 22C5.37123 22 7.15171 21.2625 8.46447 19.9497L7.05025 18.5355C6.11257 19.4732 4.8408 20 3.51472 20V22ZM27 20H24.4853V22H27V20ZM3.51472 4H1V6H3.51472V4ZM8.46447 6.05025C7.15171 4.7375 5.37123 4 3.51472 4V6C4.8408 6 6.11257 6.52678 7.05025 7.46446L8.46447 6.05025ZM24.4853 20C23.1592 20 21.8874 19.4732 20.9497 18.5355L19.5355 19.9497C20.8483 21.2625 22.6288 22 24.4853 22V20ZM11.8787 9.46447L8.46447 6.05025L7.05025 7.46446L10.4645 10.8787L11.8787 9.46447ZM20.9497 18.5355L17.5355 15.1213L16.1213 16.5355L19.5355 19.9497L20.9497 18.5355ZM22.2929 1.70711L26.2929 5.70711L27.7071 4.29289L23.7071 0.292893L22.2929 1.70711ZM26.2929 4.29289L22.2929 8.29289L23.7071 9.70711L27.7071 5.70711L26.2929 4.29289ZM22.2929 17.7071L26.2929 21.7071L27.7071 20.2929L23.7071 16.2929L22.2929 17.7071ZM26.2929 20.2929L22.2929 24.2929L23.7071 25.7071L27.7071 21.7071L26.2929 20.2929Z"/>
		</svg>
	</button> -->

	<button class="previous cursor-pointer amplitude-prev mx-1 {$player.track?.bgColor} transition-colors duration-1000 opacity-75 hover:opacity-100 w-8 h-8 rounded-full" class:text-slate-500={!$player.previous}
		on:click={() => {
			$player.playing = false
		 	skip('previous')
		}} id="previous-linkcast"
		title={"Play:" + $player.previous?.artist + " – " + $player.previous?.title || "Loading..."}
		aria-label={"Play:" + $player.previous?.artist + " – " + $player.previous?.title || "Loading..."}
		data-post-img-url={$player.previous?.image || "Loading..."}>
		<svg class="w-6 h-6 m-1" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
			<path d="M26 7C26 5.76393 24.5889 5.05836 23.6 5.8L11.6 14.8C10.8 15.4 10.8 16.6 11.6 17.2L23.6 26.2C24.5889 26.9416 26 26.2361 26 25V7Z" stroke-width="2" stroke-linejoin="round"/>
			<path d="M6 5L6 27" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>
	</button>

	<button class="play-pause cursor-pointer amplitude-play-pause mx-1 w-14 h-14 rounded-full border shadow-xl flex items-center justify-center {$player.track?.bgColor} transition-colors duration-1000 {$player.track?.theme == 'light' ? 'text-black border-black/20' : 'text-white border-white/20'} rounded-full" class:px-2={state == 'fullscreen'}
		on:click={ () => playPause() }
		title={(!$player.playing ? 'Play' : 'Pause') + " : " + $player.track?.artist + " – " + $player.track?.title || "Loading..."}
		aria-label={(!$player.playing ? 'Play' : 'Pause') + " : " + $player.track?.artist + " – " + $player.track?.title || "Loading..."}
		data-post-img-url={$player.track?.image || "Loading..."}>

		{#if !$player.playing}
		<svg id="play-icon" class="absolute ml-[3px]" width="23" height="30" viewBox="0 0 31 37" xmlns="http://www.w3.org/2000/svg" transition:fade>
			<path fill-rule="evenodd" clip-rule="evenodd" d="M29.6901 16.6608L4.00209 0.747111C2.12875 -0.476923 0.599998 0.421814 0.599998 2.75545V33.643C0.599998 35.9728 2.12747 36.8805 4.00209 35.6514L29.6901 19.7402C29.6901 19.7402 30.6043 19.0973 30.6043 18.2012C30.6043 17.3024 29.6901 16.6608 29.6901 16.6608Z"/>
		</svg>
		{/if}

		{#if $player.playing}
		<svg id="pause-icon" class="absolute" width="16" height="28" viewBox="0 0 24 36" xmlns="http://www.w3.org/2000/svg" transition:fade>
			<rect width="6" height="36" rx="3"/>
			<rect x="18" width="6" height="36" rx="3"/>
		</svg>
		{/if}
	</button>

	<button class="next cursor-pointer amplitude-next mx-1 {$player.track?.bgColor} transition-colors duration-1000 opacity-75 hover:opacity-100 h-8 w-8 {$player.track?.theme == 'light' ? 'hover:bg-white/20 hover:text-black/20' : 'hover:bg-black/20 hover:text-white/20'} rounded-full" class:text-slate-500={!$player.next}
		on:click={() => {$player.playing = false;skip('next')}} id="next-linkcast"
		title={"Play Next:" + $player.next?.artist + " – " + $player.next?.title || "Loading..."}
		aria-label={"Play Next:" + $player.next?.artist + " – " + $player.next?.title || "Loading..."}
		data-post-img-url={$player.next?.image || "Loading..."}>
		<svg class="w-6 h-6 m-1" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
			<path d="M6 7C6 5.76393 7.41115 5.05836 8.4 5.8L20.4 14.8C21.2 15.4 21.2 16.6 20.4 17.2L8.4 26.2C7.41115 26.9416 6 26.2361 6 25V7Z" stroke-width="2" stroke-linejoin="round"/>
			<path d="M26 5L26 27" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>
	</button>

	<!-- <div class="repeat cursor-pointer amplitude-repeat-song mx-1 pt-1 {$player.track?.bgColor} transition-colors duration-1000 opacity-75 hover:opacity-100 h-8 w-8  {$player.track?.theme == 'light' ? 'hover:bg-white/20 hover:text-black/20' : 'hover:bg-black/20 hover:text-white/20'} rounded-full"  class:text-yellow-400={$player.loop != 'no-repeat'}
		on:click={toggleLoop}
		title="Toggle repeat">
		<svg class="w-5 h-5 m-1 " viewBox="0 0 26 24" xmlns="http://www.w3.org/2000/svg">
			<path d="M17.7071 15.7071C18.0976 15.3166 18.0976 14.6834 17.7071 14.2929C17.3166 13.9024 16.6834 13.9024 16.2929 14.2929L17.7071 15.7071ZM13 19L12.2929 18.2929C11.9024 18.6834 11.9024 19.3166 12.2929 19.7071L13 19ZM16.2929 23.7071C16.6834 24.0976 17.3166 24.0976 17.7071 23.7071C18.0976 23.3166 18.0976 22.6834 17.7071 22.2929L16.2929 23.7071ZM19.9359 18.7035L19.8503 17.7072L19.9359 18.7035ZM8.95082 19.9005C9.50243 19.9277 9.97163 19.5025 9.99879 18.9509C10.026 18.3993 9.6008 17.9301 9.04918 17.9029L8.95082 19.9005ZM6.06408 18.7035L5.97851 19.6998L6.06408 18.7035ZM1.07501 13.4958L0.075929 13.5387L1.07501 13.4958ZM1.07501 6.50423L0.0759292 6.46127L1.07501 6.50423ZM6.06409 1.29649L6.14965 2.29282L6.06409 1.29649ZM19.9359 1.29649L19.8503 2.29283L19.9359 1.29649ZM24.925 6.50423L23.9259 6.54718L24.925 6.50423ZM24.925 13.4958L25.9241 13.5387V13.5387L24.925 13.4958ZM16.2929 14.2929L12.2929 18.2929L13.7071 19.7071L17.7071 15.7071L16.2929 14.2929ZM12.2929 19.7071L16.2929 23.7071L17.7071 22.2929L13.7071 18.2929L12.2929 19.7071ZM19.8503 17.7072C17.5929 17.901 15.3081 18 13 18V20C15.3653 20 17.7072 19.8986 20.0215 19.6998L19.8503 17.7072ZM9.04918 17.9029C8.07792 17.8551 7.1113 17.7898 6.14964 17.7072L5.97851 19.6998C6.96438 19.7845 7.95525 19.8515 8.95082 19.9005L9.04918 17.9029ZM2.07408 13.4528C2.02486 12.3081 2 11.157 2 10H0C0 11.1856 0.0254804 12.3654 0.075929 13.5387L2.07408 13.4528ZM2 10C2 8.84302 2.02486 7.69192 2.07408 6.54718L0.0759292 6.46127C0.0254806 7.63461 0 8.81436 0 10H2ZM6.14965 2.29282C8.4071 2.09896 10.6919 2 13 2V0C10.6347 0 8.29281 0.101411 5.97853 0.30016L6.14965 2.29282ZM13 2C15.3081 2 17.5929 2.09896 19.8503 2.29283L20.0215 0.30016C17.7072 0.101411 15.3653 0 13 0V2ZM23.9259 6.54718C23.9751 7.69192 24 8.84302 24 10H26C26 8.81436 25.9745 7.63461 25.9241 6.46127L23.9259 6.54718ZM24 10C24 11.157 23.9751 12.3081 23.9259 13.4528L25.9241 13.5387C25.9745 12.3654 26 11.1856 26 10H24ZM19.8503 2.29283C22.092 2.48534 23.8293 4.29889 23.9259 6.54718L25.9241 6.46127C25.7842 3.20897 23.2653 0.578736 20.0215 0.30016L19.8503 2.29283ZM6.14964 17.7072C3.90797 17.5147 2.17075 15.7011 2.07408 13.4528L0.075929 13.5387C0.215764 16.791 2.7347 19.4213 5.97851 19.6998L6.14964 17.7072ZM2.07408 6.54718C2.17075 4.29889 3.90798 2.48534 6.14965 2.29282L5.97853 0.30016C2.73471 0.578735 0.215764 3.20897 0.0759292 6.46127L2.07408 6.54718ZM20.0215 19.6998C23.2653 19.4213 25.7842 16.791 25.9241 13.5387L23.9259 13.4528C23.8292 15.7011 22.092 17.5147 19.8503 17.7072L20.0215 19.6998Z"/>
		</svg>
	</div>
 -->
 	<button class="share cursor-pointer pt-1 mx-1 text-center {$player.track?.bgColor} transition-colors duration-1000 opacity-75 hover:opacity-100 h-8 w-8 {$player.track?.theme == 'light' ? 'hover:bg-white/20 ' : 'hover:bg-black/20'} rounded-full" id="song-saved"
		on:click={toggleShare}
		title="Share this Song">
		<svg class="h-4 w-4 m-auto" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M307 34.8c-11.5 5.1-19 16.6-19 29.2v64H176C78.8 128 0 206.8 0 304C0 417.3 81.5 467.9 100.2 478.1c2.5 1.4 5.3 1.9 8.1 1.9c10.9 0 19.7-8.9 19.7-19.7c0-7.5-4.3-14.4-9.8-19.5C108.8 431.9 96 414.4 96 384c0-53 43-96 96-96h96v64c0 12.6 7.4 24.1 19 29.2s25 3 34.4-5.4l160-144c6.7-6.1 10.6-14.7 10.6-23.8s-3.8-17.7-10.6-23.8l-160-144c-9.4-8.5-22.9-10.6-34.4-5.4z"/></svg>
	</button>

 	<button class="lyrics cursor-pointer pt-1 mx-1 text-center {$player.track?.bgColor} transition-colors duration-1000 opacity-75 hover:opacity-100 h-8 w-8 {$player.track?.theme == 'light' ? 'hover:bg-white/20 ' : 'hover:bg-black/20'} rounded-full" id="song-saved"
		on:click={toggleLyrics}
		title="Toggle Lyrics"
	>
		<svg class="h-4 w-4 m-auto" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M192 0C139 0 96 43 96 96V256c0 53 43 96 96 96s96-43 96-96V96c0-53-43-96-96-96zM64 216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 89.1 66.2 162.7 152 174.4V464H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H216V430.4c85.8-11.7 152-85.3 152-174.4V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 70.7-57.3 128-128 128s-128-57.3-128-128V216z"/></svg>
	</button>
<!--
	<div class="like cursor-pointer pt-1 mx-1 text-center {$player.track?.bgColor} transition-colors duration-1000 opacity-75 hover:opacity-100 h-8 w-8 {$player.track?.theme == 'light' ? 'hover:bg-white/20 ' : 'hover:bg-black/20'} rounded-full" id="song-saved">
		<svg class="w-5 h-5 m-1" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M25 7C25 3.68629 22.2018 1 18.75 1C16.1692 1 13.9537 2.5017 13 4.64456C12.0463 2.5017 9.83082 1 7.25 1C3.79822 1 1 3.68629 1 7C1 14.6072 8.49219 20.1822 11.6365 22.187C12.4766 22.7226 13.5234 22.7226 14.3635 22.187C17.5078 20.1822 25 14.6072 25 7Z" stroke-width="2" stroke-linejoin="round"/>
		</svg>
	</div>

<button class="button bg-black {$player.track?.color}" title="Share BUTv LinkCast">
	<div class="icon">
		<i class="fa-solid fa-share"></i>
	</div>
</button>
-->

</nav>
