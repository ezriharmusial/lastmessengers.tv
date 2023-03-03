<script lang="ts">
	import { player } from "./mediaplayer";
	import { media } from "./data";
	import Artist from "./Artist.svelte";
	import Share from "./Share.svelte";

    export let title, name, image, slug, twitter, instagram, tiktok, vskit, youtube, facebook, audiomack, sex, meaning, active_region, genres, languages, experience, profession, vocal_type, society, solution, success, feedback, actions, vocal_skills, performance_setup, vision, mission, wishes, reason, motivation, inspiration, influential_artists, influential_genres, youth_influences, purpose = ""

    function sentenceArray(array:[], word:string = 'and'){
        let sentence

        if (!array || !array.length)
            return

        if (array.length == 1)
            return array[0]

        for (let index = 0; index < array.length; index++) {
            if (index + 1 == array.length)
                sentence = sentence ? sentence + ' ' + word + ' ' + array[index] : array[index];
            else
                sentence = sentence ? sentence + ', ' + array[index] : array[index]

        }
        return sentence
    }

</script>

<article class="flex align-items-stretch landscape:h-full landscape:w-full portrait:flex-col {$player.track?.alignImage == 'right' ? 'landscape:text-left' : 'landscape:flex-row-reverse landscape:text-right' }">

    <div class="landscape:w-72 shrink-0 portrait:h-1/2 {$player.track?.bgColor} {$media.find(track =>  track.artist == title)?.alignImage == 'right' ? 'text-right' : 'text-left'} h-screen overflow-y-auto pt-28">
        <header>
            <Artist {title} {name} {image} />
        </header>
        <blockquote class="text-2xl italic bold p-4" cite="https://lastmessengers.artkidsfoundation.org/artists/{slug}">
            {$media.find(track =>  track.artist == title)?.quote || ""}
        </blockquote>
        <footer class="{$player.track?.theme == 'light' ? 'bg-white/60' : 'bg-black/60'} text-xl font-bold">
            <h3 class="p-4">Follow {title} on:</h3>
            <div class="flex flex-col $media.find(track =>  track.artist == title)?.align_items}">
                {#if twitter}
                <a class="button has-text-twitter px-3 py-1 m-0 w-11/12" href="https://twitter.com/{twitter}" target="_blank" rel="nofollow noopener noreferrer" title="{title}'s Twitter page">
                    <div class="flex align-items-center">
                        <span class="mr-4">
                            <svg class="h-5 w-5 m-auto"  fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"/></svg>
                        </span>
                        @{twitter}
                    </div>
                </a>
                {/if}
                {#if instagram}
                <a class="button has-text-instagram px-3 py-1 m-0 w-11/12" href="https://www.instagram.com/{instagram}" target="_blank" rel="nofollow noopener noreferrer" title="{title}'s Instagram page">
                    <div class="flex align-items-center">
                        <span class="mr-4">
                            <svg class="h-5 w-5 m-auto" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>
                        </span>
                        @{instagram}
                    </div>
                </a>
                {/if}
                {#if tiktok}
                <a class="button has-text-tiktok px-3 py-1 m-0 w-11/12" href="https://www.tiktok.com/{tiktok}" target="_blank" rel="nofollow noopener noreferrer" title="{title}'s TikTok Handle">
                    <div class="flex align-items-center">
                        <span class="mr-4">
                            <svg class="h-5 w-5 m-auto" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/></svg>
                        </span>
                        @{tiktok}
                    </div>
                </a>
                {/if}
                {#if vskit}
                <a class="button has-text-vskit px-3 py-1 m-0 w-11/12" href="https://www.vskit.tv/{vskit}" target="_blank" rel="nofollow noopener noreferrer" title="{title}'s VSKit Handle">
                    <div class="flex align-items-center">
                        <span class="mr-4">
                            <i class="fa-brands fa-vskit"></i>
                        </span>
                        @{vskit}
                    </div>
                </a>
                {/if}
                {#if youtube}
                <a class="button has-text-youtube px-3 py-1 m-0 w-11/12" href="https://www.youtube.com/channel/{youtube}" target="_blank" rel="nofollow noopener noreferrer" title="{title}'s Youtube page">
                    <div class="flex align-items-center">
                        <span class="mr-4">
                            <svg class="h-5 w-5 m-auto" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/></svg>
                        </span>
                        {title} on Youtube
                    </div>
                </a>
                {/if}
                {#if facebook}
                <a class="button has-text-facebook px-3 py-1 m-0 w-11/12" href="https://www.facebook.com/{facebook}" target="_blank" rel="nofollow noopener noreferrer" title="{title}'s Facebook page">
                    <div class="flex align-items-center">
                        <span class="mr-4">
                            <svg class="h-5 w-5 m-auto" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"/></svg>
                        </span>
                        Facebook.com/{facebook}
                    </div>
                </a>
                {/if}
                {#if audiomack}
                <a class="button has-text- px-3 py-1 m-0 w-11/12" href="https://audiomack.com/{audiomack}" target="_blank" rel="nofollow noopener noreferrer" title="{title}'s Facebook page">
                    <div class="flex align-middle">
                        <span class="h-4 w-5 mr-4 translate-y-1 flex align-middle">
                            <img src="/images/custom-icons/mark-orange-large.png" alt="Audiomack Logk" />
                        </span>
                        Audiomack.com/{audiomack}
                    </div>
                </a>
                {/if}
            </div>
        </footer>
    </div>
    {#if sex}
    <div class="media-content grow-1 h-screen overflow-y-auto p-10 portrait:px-6 portrait:py-7 landscape:xs:pt-[60px] landscape:sm:pt-[80px] landscape:md:pt-[100px] landscape:lg:pt-[110px] landscape:xl:pt-[200px]{$player.track?.alignImage == "left" ? 'pr-10 text-left' : 'pl-10 text-right'}">
        <div class="content text-2xl landscape:lg:columns-2 landscape:xl:columns-3">
            {#if title && meaning || active_region || genres && languages || experience}
            <h3 class="marker text-3xl">The Artist</h3>
            <p>
            {name} is a music artist that records and performs under the name {title}.
            {#if meaning}{sex == "male" ? 'His' : 'Her'} artist name means
            {meaning}.{/if}
            <!-- {#if active_region}Currently active in {active_region}.{/if} -->
            </p>
            <p>
            {#if genres && languages}{title} makes music in {sentenceArray(genres)} in the languages {sentenceArray(languages)}.{/if}
            </p>
            <p>
            {#if experience}{sex == "male" ? 'His' : 'Her'} audience can expect {experience}.{/if}
            </p>
            {/if}

            {#if profession || vocal_type || vocal_skills || performance_setup}
            <h3 class="marker text-3xl">The Music</h3>
                <p>
                {title} is active as {sentenceArray(profession)} of {sex == "male" ? 'his': 'her'} own songs{#if profession == 'featured artist'} and features in songs of other artists as well{/if}.
                {#if vocal_type}{sex == "male" ? 'His' : 'Her'} { vocal_type?.length > 1 ? 'voices are' : 'voice is'} {sentenceArray(vocal_type)}.{/if}
                which {sex == "male" ? 'he' : 'she'} performs {#if vocal_skills} {sentenceArray(vocal_skills)}{/if} with {sentenceArray(performance_setup, 'or')}.
                </p>
            {/if}

            {#if vision || mission}
            <h3 class="marker text-3xl">Vision & Mission</h3>
            <p>
            {#if vision}{sex == "male" ? 'His' : 'Her'} vision is {vision}.{/if}
            {#if mission}{sex == "male" ? 'His' : 'Her'} mission is {mission}.{/if}
            </p>
            {/if}

            {#if wishes && reason || motivation && inspiration || influential_artists && influential_genres}
                <h3 class="marker text-3xl">Motivations & Influences</h3>
                <p>
                {#if reason}{title} makes music {reason}.{/if} {#if wishes}{sex == "male" ? 'He' : 'She'} wishes everyone {wishes}.{/if}
                </p>

                <p>
                {#if motivation}What motivates {sex == "male" ? 'him' : 'her'} to create {sex == "male" ? 'his' : 'her'} music {motivation}.{/if} {#if inspiration}{sex == "male" ? 'He' : 'She'} finds inspiration {inspiration}.{/if}
                </p>

                {#if youth_influences || influential_artists}
                <h3 class="marker text-3xl">Music & Life</h3>
                <p>
                {#if youth_influences}
                Growing up {sex == "male" ? 'his' : 'her'} main musical influences came from {youth_influences}.
                {/if}
                {#if influential_artists}
                {title} is influenced by popular artists like {influential_artists}.{/if}
                </p>
                {/if}
            {/if}

            {#if purpose || society }
            <h3 class="marker text-3xl">Society & Success</h3>
            {#if purpose}
            <p>
            {#if purpose}The purpose of {sex == "male" ? 'his' : 'her'} work is to {purpose}{/if} {#if solution} and {sex == "male" ? 'he' : 'she'} is convinced {sex == "male" ? 'his' : 'her'} music affects societal issues {solution}{/if}.
            </p>
            {/if}
            {#if success || actions || feedback}
            <p>
            {#if success}{title} defines success by {success}.{/if}
            {#if actions}{sex == "male" ? 'He' : 'She'} develops {sex == "male" ? 'his' : 'her'} skills by {actions}.{/if}
            {#if feedback}{sex == "male" ? 'He' : 'She'} embraces feedback from critics and music lovers because {feedback}.{/if}
            </p>
            {/if}
            {/if}

            <h3 class="marker text-3xl">{sex == "male" ? 'His-' : 'Her-s'}tory</h3>
            <p>
            <slot />
            </p>

            <!--
            <div class="columns-2">
                {#each Object.entries(artist) as [key, value]}

                <svelte:component this={content} />
                <span class="flex-col pb-6">
                    <h2 class="font-bold text-3xl mr-2">{key}</h2>
                    <p class="text-2xl">{value}</p>
                </span>
                {/each}
            </div> -->
        </div>
    </div>
    {/if}
</article>

<style>
    p {
        padding-bottom: 1rem;
    }

    @media (orientation: landscape) {
	    .media-content {
           mask-image: linear-gradient(175deg, transparent 5%, black 15%, black 85%, transparent 95%);
	    }
	}

</style>
