<script>
	import { player } from './mediaplayer';
	import { toggleShare, UI } from './ui';
  	import { onMount } from 'svelte';

	export let page = {};

	let lang = 'en'
  let nativeShare = false;
  let title;
  let url;

  const locale = {};
    locale['en'] = {
        "share_this": "Share Track"
      }
    locale['nl'] = {
        "share_this": "Deel Nummer"
      }


  onMount(() => {
    if (navigator.share) {
      nativeShare = true;
    }
    title=$player.track?.order < 10 ? '0' + $player.track?.order : $player.track?.order + '. ' + $player.track?.artist + ' - ' + $player.track?.title + ($player.track?.featuring) ? ( typeof Array.isArray($player?.track?.featuring) && $player?.track?.featuring?.length > 2 ) ? 'feat. Various Artists' : 'feat. ' + $player.track?.featuring : ''  + $player.track?.track;
    url=$page.url;
  });

  function shareThis() {
    navigator.share({
      title: title,
      url: url
    })
      .then(() => {
        console.info('Thanks for Sharing')
      })
      .catch(console.error);
  }
</script>

{#if $UI.share.visible}
<!-- <div class="toggle-menu-backdrop absolute top-0 left-0 w-full h-full { $player.track?.theme == 'light' ? 'bg-white/50' : 'bg-black/50'} backdrop-brightness-20 hidden-desktop flex-touch" on:click={toggleMenu} transition:fade>-->
	<button class="font-mono absolute top-4 right-6 marker font-bold {$player.track?.theme == 'dark' ? 'text-white' : 'text-black'} text-2xl" aria-label="Close Tracklist" on:click={toggleShare}>x</button>
<!-- </div> -->
{/if}

<h4 class="subtitle mb-4 portrait:text-3xl landscape:xs:text-xl landscape:sm:text-2xl landscape:md:text-3xl landscape:lg:text-4xl landscape:xl:text-5xl {$player.track?.theme == 'light' ? 'text-slate-900' : 'text-slate-200' }  uppercase">
	{ locale[lang].share_this }:
</h4>

<div class="artkids-social flex flex-row">
	{#if !nativeShare}
	<a class="button text-2xl" rel="nofollow noopener noreferrer"
		href="https://www.facebook.com/sharer/sharer.php?u={encodeURIComponent(url)}"
		target="_blank" title="Share {title} on Facebook" area-label="Share {title} on Facebook">
		<svg
		class="w-6 h-6 text-blue-600 fill-current"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24">
		<path
			d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
		/>
		</svg>
	</a>
	<a class="button text-2xl " rel="nofollow noopener noreferrer"
		href="https://twitter.com/intent/tweet?text={encodeURIComponent(title)}&amp;url={encodeURIComponent(url)}&amp;via={encodeURIComponent(url)}"
		target="_blank" title="Share {title} on Twitter" area-label="Share {title} on Twitter">
		<svg
		class="w-6 h-6 text-blue-300 fill-current"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24">
		<path
			d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
		/>
		</svg>
	</a>
	<a class="button text-2xl " rel="nofollow noopener noreferrer"
		href="whatsapp://send?text={encodeURIComponent(title)} {encodeURIComponent(url)}"
		target="_blank" title="Share {title} on WhatsApp" area-label="Share {title} on WhatsApp">
		<svg
			class="w-6 h-6 text-green-400 fill-current"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 448 512">
			<path
			d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
			></path>
		</svg>
	</a>
	<a class="button text-2xl " rel="nofollow noopener noreferrer"
	href="https://www.linkedin.com/shareArticle?mini=true&amp;url={encodeURIComponent(url)}&amp;title={encodeURIComponent(title)}"
		target="_blank" title="Share {title} on LinkedIn" area-label="Share {title} on LinkedIn">
		<svg
		class="w-6 h-6 text-blue-500 fill-current"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 448 512">
		<path
			d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
		></path>
		</svg>
	</a>
	<a class="button text-2xl " rel="nofollow noopener noreferrer"
		href="https://Telegram.com/pin/create/button/?url={encodeURIComponent(url)}&amp;description={encodeURIComponent(title)}"
		data-pin-custom="true" target="_blank" title="Share {title} on Telegram" area-label="Share {title} on Telegram">
		<svg
		class="w-6 h-6 text-gray-400 text-blue-400 fill-current"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 496 512">
		<path
			d="M248,8C111.033,8,0,119.033,0,256S111.033,504,248,504,496,392.967,496,256,384.967,8,248,8ZM362.952,176.66c-3.732,39.215-19.881,134.378-28.1,178.3-3.476,18.584-10.322,24.816-16.948,25.425-14.4,1.326-25.338-9.517-39.287-18.661-21.827-14.308-34.158-23.215-55.346-37.177-24.485-16.135-8.612-25,5.342-39.5,3.652-3.793,67.107-61.51,68.335-66.746.153-.655.3-3.1-1.154-4.384s-3.59-.849-5.135-.5q-3.283.746-104.608,69.142-14.845,10.194-26.894,9.934c-8.855-.191-25.888-5.006-38.551-9.123-15.531-5.048-27.875-7.717-26.8-16.291q.84-6.7,18.45-13.7,108.446-47.248,144.628-62.3c68.872-28.647,83.183-33.623,92.511-33.789,2.052-.034,6.639.474,9.61,2.885a10.452,10.452,0,0,1,3.53,6.716A43.765,43.765,0,0,1,362.952,176.66Z"
		></path>
		</svg>
	</a>

	<a class="button text-2xl " rel="nofollow noopener noreferrer"
		href="https://reddit.com/pin/create/button/?url={encodeURIComponent(url)}&amp;description={encodeURIComponent(title)}"
		data-pin-custom="true" target="_blank" title="Share {title} on Reddit" area-label="Share {title} on Reddit">
		<svg
		class="w-6 h-6 text-red-500 fill-current"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg">
		<path
			d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"
		/>
		</svg>
	</a>

	<a class="button text-2xl " rel="nofollow noopener noreferrer"
		href="https://pinterest.com/pin/create/button/?url={encodeURIComponent(url)}&amp;description={encodeURIComponent(title)}"
		data-pin-custom="true" target="_blank" title="Share {title} on Pinterest" area-label="Share {title} on Pinterest">
		<svg
		class="w-6 h-6 text-pink-600 fill-current"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg">
		<path
			d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"
		/>
		</svg>
	</a>
	{:else}
	<button on:click={shareThis} class="button " title="Share {title}" area-label="Share {title}">
		<span class="icon ">
		<i class="fa-brands fa-link" />
		<!-- <Icon client:only icon={faShareAlt} /> -->
		</span>
		<span>{ locale[lang].share_this }</span>
	</button>
	{/if}
</div>
