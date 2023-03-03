<script lang="ts">
	import { player } from "./mediaplayer";
	import { albums, getArtistImage } from "./data";
// albums
</script>

<img class="lazy shrink-0 grow-1 drop-shadow bg-gradient-to-br from-slate-900 to-black portrait:m-10 portrait:w-2/4 portrait:mx-auto landscape:mr-6 landscape:w-28 landscape:sm:w-32 landscape:md:w-32 landscape:md:h-32 landscape:lg:w-48 landscape:lg:h-48 rounded-md border-3"
	data-amplitude-song-info="cover_art_url"
	alt="Track CoverArt"
	src={$player.track?.image || getArtistImage($player.track?.artist)}
	/>

	<div class="portrait:text-2xl landscape:text-xl sm:text-3xl landscape:lg:text-4xl flex shrink-1 grow-0 flex-col portrait:self-start p-6 portrait:w-full portrait:mb-20 {$player.track?.color} drop-shadow-2xl">
		<p class="font-bold">
			<span class="portrait:text-3xl landscape:text-2xl landscape:sm:text-4xl landscape:lg:text-5xl">
				{$player.track?.order < 10 ? '0' + $player.track?.order : $player.track?.order}. {$player
					.track?.artist} - {$player.track?.title}
					{($player.track?.featuring) ? ( typeof Array.isArray($player?.track?.featuring) && $player?.track?.featuring?.length > 2 ) ? 'feat. Various Artists' : 'feat. ' + $player.track?.featuring : '' }
				</span>
			</p>
			{#if $player.track?.release_album}
			<p data-amplitude-song-info="album" class="opacity-75 flex justify-self-center">
				<a class="font-semibold text-black hover:text-yellow-400 focus-text-gray-900 dark:text-white dark:hover:text-yellow-400 dark:focus:text-gray-100" href="/{$albums[0]?.slug}" alt="Unity Album 22">{$player.track?.release_album}</a>
				{#if $player.track?.genres}
				<span class="text-lg my-auto">
					{#each $player.track?.genres as genre, i}
					<span class="rounded py-1 px-2 mx-2 d{$player.track?.bgColor} mix-blend-multiply">{genre}</span>
					{/each}
				</span>
				{/if}
			</p>
			{/if}
			{#if $player.track?.producer}
			<p>
				Produced by:
				{#each $player.track?.producer as producer, i}
				{producer}{$player.track?.producer.length > i + 1 ? ', ' : ''}
				{/each}
			</p>
			{/if}
		</div>