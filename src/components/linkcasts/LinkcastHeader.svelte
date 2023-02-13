<script lang="ts">
	import { getMixcloudID, getYouTubeID, getLinkcastType } from "@lib/embeds";
	import { YoutubeGenerator, DeezerGenerator, SpotifyGenerator } from "embedgenerator"

	export let linkcast

	let type = getLinkcastType(linkcast?.data.url)
</script>

	{#if type == "image"}
	<img src={linkcast?.data.image} class={"bg-black/50 w-full " +

			linkcast?.data.imageRatio == 'aspect-square' ? 'aspect-square'
			: linkcast?.data.imageRatio == 'aspect-[9/16]' ? 'aspect-[9/16]'
			: linkcast?.data.imageRatio == 'aspect-[16/9]' ? 'aspect-[16/9]'
			: linkcast?.data.imageRatio == 'aspect-[9/21]' ? 'aspect-[9/21]'
			: linkcast?.data.imageRatio == 'aspect-[21/9]' ? 'aspect-[21/9]'
			: linkcast?.data.imageRatio == 'aspect-[4/3]' ? 'aspect-[4/3]'
			: linkcast?.data.imageRatio == 'aspect-[3/4]' ? 'aspect-[3/4]'
			: 'aspect-square'
		}
		alt="Post" />

	{:else if type == 'whatsapp'}
	<figure class="relative">
	<img src={linkcast?.data.image} class={"background-black w-full " +

			linkcast?.data.imageRatio == 'aspect-square' ? 'aspect-square'
			: linkcast?.data.imageRatio == 'aspect-[9/16]' ? 'aspect-[9/16]'
			: linkcast?.data.imageRatio == 'aspect-[16/9]' ? 'aspect-[16/9]'
			: linkcast?.data.imageRatio == 'aspect-[9/21]' ? 'aspect-[9/21]'
			: linkcast?.data.imageRatio == 'aspect-[21/9]' ? 'aspect-[21/9]'
			: linkcast?.data.imageRatio == 'aspect-[4/3]' ? 'aspect-[4/3]'
			: linkcast?.data.imageRatio == 'aspect-[3/4]' ? 'aspect-[3/4]'
			: linkcast?.data.imageRatio == 'aspect-square' ? 'aspect-square'
			: 'aspect-square'
		}
		alt="Post" />
		<img src="/images/embeds/join-whatsapp-group.png" class="absolute w-full px-10 top-0 left-0 translate-y-1/2 backdrop-blur-3xl" alt="Join Whatsapp Group" />
	</figure>
	<!-- <a href={linkcast?.data.url} class="btn btn-primary" title="Open url to join Whatsapp group" target="_blank" rel="noopener noreferrer"> -->
	<!-- Join our Whatsapp group -->
	<!-- </a> -->
	{:else if type == 'youtube'}
		{#await YoutubeGenerator.embed(linkcast?.data.url)}
			<img src={linkcast?.data.image} class="bg-black/50" alt="Join our Whatsapp Group" />

		{:then youtubeUrl}
		<iframe width="100%" height="100%" class="aspect-[16/9]" src="https://www.youtube-nocookie.com/embed/{getYouTubeID(youtubeUrl)}?controls=0" title="YouTube video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
		{/await}


	{:else if type == 'bandcamp'}
		<iframe title="bandcamp player" style="border: 0; width: 350px; height: 470px;" src="https://bandcamp.com/EmbeddedPlayer/album=3641460325/size=large/bgcol=333333/linkcol=9a64ff/tracklist=false/transparent=true/" seamless><a href={linkcast?.data.url}>Africa4Africa - Unity Album 2022 by LastMessengerS</a></iframe>
	<!-- {:else if type == 'soundcloud'}
		{#await SoundcloudGenerator.embed(linkcast?.data.url)}
		<img src={linkcast?.data.image} class="bg-black/50 w-full
			{
				linkcast?.data.imageRatio == 'aspect-square' ? 'aspect-square'
				: linkcast?.data.imageRatio == 'aspect-[9/16]' ? 'aspect-[9/16]'
				: linkcast?.data.imageRatio == 'aspect-[16/9]' ? 'aspect-[16/9]'
				: linkcast?.data.imageRatio == 'aspect-[9/21]' ? 'aspect-[9/21]'
				: linkcast?.data.imageRatio == 'aspect-[21/9]' ? 'aspect-[21/9]'
				: linkcast?.data.imageRatio == 'aspect-[4/3]' ? 'aspect-[4/3]'
				: linkcast?.data.imageRatio == 'aspect-[3/4]' ? 'aspect-[3/4]'
				: 'aspect-square'
			}
			alt="Post" />
		{:then url}
		<iframe width="100%" height="100%" src="https://www.youtube-nocookie.com/embed/{getYouTubeID(url)}?controls=0" title="YouTube video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
		{/await} -->

	{:else if type == 'spotify'}
		{#await SpotifyGenerator.embed(linkcast?.data.url)}
		<img src={linkcast?.data.image} class={"bg-black/50 w-full " +

				linkcast?.data.imageRatio == 'aspect-square' ? 'aspect-square'
				: linkcast?.data.imageRatio == 'aspect-[9/16]' ? 'aspect-[9/16]'
				: linkcast?.data.imageRatio == 'aspect-[16/9]' ? 'aspect-[16/9]'
				: linkcast?.data.imageRatio == 'aspect-[9/21]' ? 'aspect-[9/21]'
				: linkcast?.data.imageRatio == 'aspect-[21/9]' ? 'aspect-[21/9]'
				: linkcast?.data.imageRatio == 'aspect-[4/3]' ? 'aspect-[4/3]'
				: linkcast?.data.imageRatio == 'aspect-[3/4]' ? 'aspect-[3/4]'
				: 'aspect-square'
			}
			alt="Post" />
		{:then spotifyUrl}
			<iframe style="border-radius:12px" src={spotifyUrl} width="100%" height="380" frameBorder="0" allowfullscreen={true} allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" title="Spotify Player"></iframe>
		{/await}

	{:else if type == 'deezer'}
		{#await DeezerGenerator.embed(linkcast?.data.url)}
		<img src={linkcast?.data.image} class={"bg-black/50 w-full " +
				linkcast?.data.imageRatio == 'aspect-square' ? 'aspect-square'
				: linkcast?.data.imageRatio == 'aspect-[9/16]' ? 'aspect-[9/16]'
				: linkcast?.data.imageRatio == 'aspect-[16/9]' ? 'aspect-[16/9]'
				: linkcast?.data.imageRatio == 'aspect-[9/21]' ? 'aspect-[9/21]'
				: linkcast?.data.imageRatio == 'aspect-[21/9]' ? 'aspect-[21/9]'
				: linkcast?.data.imageRatio == 'aspect-[4/3]' ? 'aspect-[4/3]'
				: linkcast?.data.imageRatio == 'aspect-[3/4]' ? 'aspect-[3/4]'
				: 'aspect-square'
			}
			alt="Post" />
		{:then deezerUrl}
		<div class="aspect-square">
		<iframe width="100%" height="100%" src={deezerUrl} title="deezer-widget" frameborder="0" allowtransparency={true} allow="encrypted-media; clipboard-write" ></iframe>
		</div>
		{/await}

	{:else if type == 'mixcloud'}
		<div class="aspect-square">
			<iframe width="100%" height="100%"src={"https://www.mixcloud.com/widget/iframe/?autoplay=" + (linkcast?.data.autoplay || 0 ) + "&feed=" + getMixcloudID(linkcast?.data.url)} title="Mixcloud Player" frameborder="0" allow="autoplay"></iframe>
        </div>
	{/if}