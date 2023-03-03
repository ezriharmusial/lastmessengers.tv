<script lang="ts">
	export let title
	export let name
	export let image
	export let slug
	export let bgColor
	export let color
</script>

<div class="relative overflow-hidden bg-slate-900/20 transition-transform duration-700 {bgColor} {color} ease-in-out hover:scale-110 hover:z-10 rounded" data-mdb-ripple="true" data-mdb-ripple-color="light">
	<img class="lazy max-w-xs mt-5 ml-auto right-0" src="{image}" alt="Profile Picture of {title}"/>
  	<!-- <img src="https://mdbootstrap.com/img/Photos/Others/mewa.jpg" class="max-w-xs" /> -->
    <div class="absolute top-0 right-0 bottom-0 left-0 p-5 w-full h-full overflow-hidden bg-fixed bg-black/20 hover:bg-transparent flex flex-col justify-end font-shadow">
		<h2 class="title uppercase drop-shadow-md text-red-500 dark:text-yellow-300 portrait:text-3xl landscape:xs:text-sm landscape:sm:text-md landscape:md:text-lg landscape:lg:text-xl landscape:xl:text-2xl text-shadow">
			{@html title}
		</h2>

		<h3 class="subtitle uppercase drop-shadow-md portrait:text-xl landscape:xs:text-sm landscape:sm:text-md landscape:md:text-lg landscape:lg:text-xl landscape:xl:text-2xl">
            {#if name != 'unknown' }A.K.A: {name}{/if}
		</h3>
	</div>
	{#if slug}
	<a class="absolute top-0 left-0 w-full h-full" href="/artists/{slug}">
	</a>
	{/if}
</div>

<!-- <article>
    <figure class="bg-gradient-to-br {$player.track?.theme == 'light' ? 'from-white to-neutral-200' : 'from-black to-neutral-900' } rounded-full m-10">
	    <img class="lazy object-cover rounded-full border-3 border-yellow-300" src="{artist.image || '/uploads/albumcovers/happysunofyah.jpg'}" alt="Profile Picture of {artist.title}"/>
    </figure>

	<div class="m-10">
		<h2 class="title uppercase {$player.track?.theme == 'light' ? 'text-red-500' : 'text-yellow-300'} portrait:text-3xl landscape:xs:text-sm landscape:sm:text-md landscape:md:text-lg landscape:lg:text-xl landscape:xl:text-2xl text-shadow">
			{@html artist.title}
		</h2>

		<h3 class="subtitle uppercase portrait:text-xl landscape:xs:text-sm landscape:sm:text-md landscape:md:text-lg landscape:lg:text-xl landscape:xl:text-2xl">
            {#if artist.name != 'unknown' }Born as: {artist.name}{/if}
		</h3>
	</div>
</article> -->
