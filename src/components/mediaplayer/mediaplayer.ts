// import { goto } from "$app/navigation";
// import { browser } from "$app/environment";
import { writable, type Writable, get } from "svelte/store";
import { media as mediaRaw, type Media } from "./data";
import { Howl, Howler} from 'howler';


// if ('mediaSession' in navigator) {
// navigator.mediaSession.metadata = new MediaMetadata();
// }

let media = get(mediaRaw)

interface MediaPlayer {
	[x: string]: any;
    autoplay: Boolean
    duration: string
    currentTime: string
    seeking: Boolean
    progress: number
    progressProposition: number
    volume: number
    context?: AudioContext | undefined
    analyser?: AnalyserNode | undefined
    state: string
    playing: Boolean
    loop: string
    lyrics: Boolean
    shuffle: Boolean
    playlist: Media[]
    order: number
    index: number
    source?: MediaElementAudioSourceNode | undefined
    bufferLength?: any
    dataArray?: Uint8Array | undefined
    data: any
    track: Media | boolean
    next: Media | boolean
    previous: Media | boolean
}

const loopStates = ['no-repeat', 'repeat', 'repeat-track']

/**
* Player class containing the state of our playlist and where we are in it.
* Includes all methods for playing, skipping, updating the display, etc.
* @param {Array} playlist Array of objects with playlist song details ({title, file, howl}).
*/

export const player:Writable<MediaPlayer> = writable({
    autoplay: false,
    duration: "0:00",
    currentTime: "0:00",
    seeking: false,
    progress: 0,
    progressProposition: 0,
    volume: 100,
    state: "unMounted",
    playing: false,
    loop: "no-repeat",
    lyrics: true,
    shuffle: false,
    data: undefined,
    playlist: get(mediaRaw).media,
    index: 1,
    track: this?.playlist?.find(track => track.order == this?.index) || false,
    next: this?.playlist?.find(track => track.order == this?.index + 1) || false,
    previous: this?.playlist?.find(track => track.order == this?.index - 1) || false
})

    /**
    * Play a song in the playlist.
    * @param  {Number} index Index of the song in the playlist (leave empty to play the first or current).
    */
    export const play = function(index: number) {
        let $player = get(player)
        let song:Media;

        index = typeof index === 'number' ? index : $player.index;
        let trackToPlay = media.media?.find(track => track.order == index);

        if (!window || !trackToPlay)
            return
        // If we already loaded this track, use the current one.
        // Otherwise, setup and load a new Howl.
        if (trackToPlay?.howl) {
            song = trackToPlay.howl;
        } else {
            song = trackToPlay.howl = new Howl({
                src: [trackToPlay.media_file],
                html5: true, // Force to HTML5 so that the audio can stream in (best for large files).
                onplay: function() {
                    // Display the duration.
                    $player.duration = getDigits(Math.round(song.duration()));

                    // Start updating the progress of the track.
                    requestAnimationFrame(step.bind(self));

                    // Start the animation here, if we have already loaded
                    // animation.start();
                    $player.playing = true;
                    player.set($player)
                    // Update MediaSession state
                    if ('mediaSession' in navigator)
                        navigator.mediaSession.playbackState = 'playing';
                },
                onload: function() {
                    // Start the animation.
                    // animation.start();
                    $player.state = 'loaded'
                    player.set($player)
                },
                onend: function() {
                    // Stop the animation.
                    // animation.start();
                    $player.playing = false
                    player.set($player)
                    skip('next');
                },
                onpause: function() {
                    // Stop the animation.
                    // animation.stop();

                    $player.playing = false
                    player.set($player)

                    // Update MediaSession state
                    if ('mediaSession' in navigator)
                        navigator.mediaSession.playbackState = 'paused';
                 },
                onstop: function() {
                    // Stop the animation.
                    // animation.stop();
                    $player.playing = false
                    player.set($player)
                },
                onseek: function() {
                    // Start updating the progress of the track.
                    requestAnimationFrame(step.bind(self));
                }
            });
        }

        // Begin playing the song.
        song.stop();
        // TODO: Put into FSM
        song.volume(1)
        song.play();

        // Keep track of the index we are currently playing.
        $player.index = index;

        $player.track = media.media?.find(track => track.order == index) || false
        $player.next = media.media?.find(track => track.order == index + 1) || false
        $player.previous = media.media?.find(track => track.order == index - 1) || false
        const media = get(mediaRaw)
        media.selected = media[index]
        // Update the track display.
        // track.innerHTML = (index + 1) + '. ' + data.title;

        // Show the pause button.
        if (song.state() === 'loaded') {
            $player.state = "loaded"
        } else {
            // $player.state = 'loading'
        }

        player.set($player)

        // Set Media Metadata
        setSessionMetaData(trackToPlay)
        // navigate to track page
        if (window)
        window.location.assign('/unity-album-2022/' + trackToPlay?.slug)
    }

    /**
    * Pause the currently playing track.
    */
    export const playPause = function() {
        const $player = get(player)

        // Get the Howl we want to manipulate.
        const song = media.media?.find(track => track.order == $player.index).howl;

        if (song) {
            // If song is playing
            if (song.playing()){
                // Pause the song.
                song.pause();
                // Show the play button.
                $player.playing = false
            } else {
                // Play the song
                song.play();
                // Show the pause button.
                $player.playing = true
            }
        } else {
            play($player.track.order)
        }


        player.set($player)

    }

    /**
    * Skip to the next or previous track.
    * @param  {String} direction 'next' or 'previous'.
    */
    export const skip = function(direction: "next" | "previous") {
        // Get Writable
        const $player = get(player)

        // Bail if loading
        if ($player.state == 'loading next' || $player.state == 'loading previous')
            return

        const songCurrent:Howl = media.media?.find(track => track.order == $player.index)?.howl;

        //TODO remove hack
        // Get the next track based on the direction of the track.
        let index = 1;
        if (direction === 'previous') {


            //If progress is in the beginning
            if (!$player.progress || $player.progress < 5) {
                // get previous index
                index = $player.index - 1;
                if (index == 0) {
                    index = media.media?.length;
                    $player.state = 'loading previous'
                }
            } else {
                stop()
                songCurrent.stop()
                $player.progress = 0
                songCurrent.play()
                $player.playing = true
                player.set($player)
                return
            }
        } else {

            // console.log('here')
            index = $player.index + 1;
            if (index > media.media?.length) {
                index = 1;
            }
            $player.state = 'loading next'
        }

        let timeOut: ReturnType<typeof setTimeout> | undefined

        // If the currentSound is still playing, and it has not been faded
        if (songCurrent?.playing() && !timeOut) {
            // console.log('fade')
            // Fade it
            // Set Writable
            songCurrent?.fade(1, 0, 2000)
            timeOut = setTimeout(() => {
                $player.playing = false
                skipTo(index);
                clearTimeout(timeOut)
            }, 3000)
        } else {
            // console.log('skip')
            $player.playing = false
            clearTimeout(timeOut)
            skipTo(index);
        }

    }

    /**
    * Skip to a specific track based on its playlist index.
    * @param  {Number} index Index in the playlist.
    */
    export const skipTo = function(index: number) {
        // Get Writable
        const $player = get(player)
        const currentTrack = media.media?.find(track => track.order == $player.index)

        // Stop the current track.
        if (currentTrack?.howl && currentTrack.howl.playing()) {
            currentTrack.howl.stop();
        }

        // Reset progress.
        // progress.style.width = '0%';
        $player.progress = 0

        // Play the new track.
        play(index);
    }

    /**
    * Set the volume and update the volume slider display.
    * @param  {Number} val Volume between 0 and 1.
    */
    export const setVolume = function(val: number) {
        // Get Writable
        const $player = get(player)

        // Update the global volume (affecting all Howls).
        Howler.volume(val);

        // Update the display on the slider.
        const barWidth = (val * 90) / 100;
        $player.volume = (barWidth * 100);
        //? sliderBtn.style.left = (window.innerWidth * barWidth + window.innerWidth * 0.05 - 25) + 'px';

        player.set($player)
    }

    /**
    * Seek to a new position in the currently playing track.
    * @param  {Number} per Percentage through the song to skip.
    */
    // TODO: Change percentage to seconds to correlate with MediaSessions
    export const seek = function(per: number) {
        // Get Writable
        const $player = get(player)

        // if the track is not loaded, load it trough play...
        if (!$player.track?.howl)
            play($player.index)

        // Get the Howl we want to manipulate
        const song = media.media?.find(track => track.order == $player.index)?.howl ;

        // Convert the percent into a seek position.
        if (song) {
            song.seek(song.duration() * per / 100);
            // Update Writable
        }

        player.set($player)
    }

    /**
    * The step called within requestAnimationFrame to update the playback position.
    */
    export const step = function() {
        // Get Writable
        const $player = get(player)

        // Get the Howl we want to manipulate.
        const song = media.media?.find(track => track.order == $player.index)?.howl;

        // Determine our current seek position.
        const seek = song?.seek() || 0;
        $player.currentTime = getDigits(Math.round(seek));
        $player.progress = (((seek / song.duration()) * 100) || 0);

        // Update Mediasession
        updateMediaSession(song)

        // If the song is still playing, continue stepping.
        if (song.playing()) {
            requestAnimationFrame(step.bind(self));
        }

        // Update Writable
        player.set($player)
    }

    /**
    * Togle Loop states
    */
    export const toggleShuffle = function() {
        // Get Writable
        const $player = get(player)

        // add 1 to index, then calculate the modulo based on total amount of loop states
        $player.shuffle = !$player.shuffle

        // Update Writable
        player.set($player)
    }

    /**
    * Togle Loop states
    */
    export const toggleLoop = function() {
        // Get Writable
        const $player = get(player)

        // get current Index
        const index = loopStates.indexOf($player.loop)

        // add 1 to index, then calculate the modulo based on total amount of loop states
        $player.loop = loopStates[(index + 1 % loopStates.length)] || loopStates[0]

        // Update Writable
        player.set($player)
    }

    /**
    * Toggle Lyrics display states
    */
     export const toggleLyrics = function() {
        // Get Writable
        const $player = get(player)

        // add 1 to index, then calculate the modulo based on total amount of loop states
        $player.lyrics =  !$player.lyrics

        // Update Writable
        player.set($player)
    }


    /**
    * Toggle the volume display on/off.
    */
    //   toggleVolume: function() {
    //     let $player = get(player)
    //     let display = (volume.style.display === 'block') ? 'none' : 'block';

    //     setTimeout(function() {
    //       volume.style.display = display;
    //     }, (display === 'block') ? 0 : 500);
    //     volume.className = (display === 'block') ? 'fadein' : 'fadeout';
    //   },

    // Get Time Digits
    export const getDigits = function(times:number) {
        // Get Writable
        const $player = get(player)
        const song = $player.track.howl

        // there is no song, bail
        if (!song)
            return "0:00"

        const time = times || Math.round(song.duration - song.currentTime);
        const minutes = Math.floor(time / 60);
        let seconds = Math.floor(time - 60 * minutes);
        seconds = seconds < 10 ? '0' + seconds : seconds;

        if (isNaN(minutes) && isNaN(seconds))
        return "0:00"
        else
        return minutes + ':' + seconds;
    }

    function getArtwork(){
    // const $artists = get(artists)
    const artwork = [
        { src: 'https://dummyimage.com/96x96',   sizes: '96x96',   type: 'image/png' },
        { src: 'https://dummyimage.com/128x128', sizes: '128x128', type: 'image/png' },
        { src: 'https://dummyimage.com/192x192', sizes: '192x192', type: 'image/png' },
        { src: 'https://dummyimage.com/256x256', sizes: '256x256', type: 'image/png' },
        { src: 'https://dummyimage.com/384x384', sizes: '384x384', type: 'image/png' },
        { src: 'https://dummyimage.com/512x512', sizes: '512x512', type: 'image/png' },
    ]

    // TODO: Automate
    // Get Artist image url
    // let artistImage = $artists.find(artist => artist.title == track.artist).image
    // Transform image to
    // do iets met (artistImage)
    // Get Meta Data
    // artwork = getImageMeta(file)

    return artwork
}

export const setSessionMetaData = (data) => {
    let SessionMetaData:MediaMetadata
    const $player = get(player)

    if ('mediaSession' in navigator){
        SessionMetaData = new MediaMetadata({
            title: data.title + (data.featuring ? ' ft. ' + data.featuring.join(', ') : '') || "Unknown Track",
            artist: data.artist || "Unknown Artist",
            album: data.release_album || "Unknown Album",
            artwork: getArtwork()
        })

        const actionHandlers = [
            ['play',          () => { play(data.order) }],
            ['pause',         () => { pause() }],
            ['previoustrack', () => { skip('previous') }],
            ['nexttrack',     () => { skip('next') }],
            ['stop',          () => { stop() } ],
            ['seekbackward',  (details) => { seek($player.progress - 5) }],
            ['seekforward',   (details) => { seek($player.progress + 5) }],
            ['seekto',        (details) => { seek(details.seekOffset) }],
        ]

        for (const [action, handler] of actionHandlers) {
            try {
              navigator.mediaSession.setActionHandler(action, handler);
            } catch (error) {
              console.log(`The media session action "${action}" is not supported yet.`);
            }
        }

        // updateMediaSession(song)
        updateMediaSession(data.howl)

    }
}

export const updateMediaSession = (song) => {
    if ('mediaSession' in navigator){
        navigator.mediaSession.setPositionState({
            duration: song.duration(),
            playbackRate: song.rate(),
            position: song.seek() || 0,
        })
    }
}

async function setAudio() {
    const $player = get(player)
    console.log('setAUdio Called')
    // If there is no COntext, set context first
    if (!$player.context) {
        try {
            // Create COntext
            $player.context = new AudioContext()
            // Create Analyser
            $player.analyser = $player.context.createAnalyser()
            // Set FFT
            $player.analyser.fftSize = 512;
        } catch(e) {
            throw new Error('The Web Audio API is unavailable');
        }
    }

    // If the Player is mounted
    if ($player.track.howl) {
        // Create Media Element Source
        $player.source = $player.context.createMediaElementSource($player?.wavesurfer);
        // Connect Media Element Source to the Analyser
        $player.source?.connect($player.analyser);
        // Connect the analyser to the context destination
        $player.analyser.connect($player.context.destination);
        // console.log('$player.context', $player.context)
        // console.log('$player.analyser', $player.analyser)
        $player.bufferLength = $player.analyser.frequencyBinCount
        $player.dataArray = new Uint8Array($player.bufferLength);
        // $player?.wavesurfer.play()
    }

    // Update Writable
    player.set($player)
}
