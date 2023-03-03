import { get, writable, type Writable } from "svelte/store";
import fsm from 'svelte-fsm';

interface UserInterfaceState {
    visible: boolean
    visibilityTimer: number
}

interface UI {

    darkMode: boolean
    artist: {
        visible: boolean
    },
    menu: {
        visible: boolean
    },
    login: {
        visible: boolean
    },
    search: {
        visible: boolean
    },
    showDebug: {
        visible: boolean
    },
    share: {
        visible: boolean
    },
    controls: {
        visible: boolean,
        visibilityTimer: -1
    },
    trackPage: {
        visible: boolean
    }
}

export const UIState = fsm('fullscreen', {
    fullscreen: {
        toggle: 'navigation'
    },
    navigation: {
        toggle: 'fullscreen'
    }
})

export const UI:Writable<UI> = writable({
    darkMode: true,
    artist: {
        visible: false
    },
    menu: {
        visible: false
    },
    login: {
        visible: false
    },
    search: {
        visible: false
    },
    share: {
        visible: false
    },
    showDebug: {
        visible: false
    },
    controls: {
        visible: true,
        visibilityTimer: -1
    },
    trackPage: {
        visible: false
    }
})


export const autoHideControls = () => {
    const $UI = get(UI)
    const $UIState = get(UIState)

    // If not in Fullscreen, eject and let timer finish.
    if ($UIState != 'fullscreen') {
        // console.log('niet fullscreen')
        $UI.controls.visible = true;
        return
    }

    // If visibilityTimer exists clear it
    if ($UI.controls.visibilityTimer) {
        clearTimeout($UI.controls.visibilityTimer);
        $UI.controls.visibilityTimer = -1;
        UI.set($UI)
    }

    // Show Control
    $UI.controls.visible = true
    UI.set($UI)

    // Hide Controls after timer finished
    $UI.controls.visibilityTimer = setTimeout(function () {
        $UI.controls.visible = false
    }, 5000)
};

// Close the menu button
export const closeMenu = () => {
    const $UI = get(UI)
    $UI.menu.visible = false
    UI.set($UI)
}

// Toggle Menu
export const toggleMenu = () => {
    const $UI = get(UI)
    UIState.toggle()
    const $UIState = get(UIState)
    // console.log($UIState)
    $UI.menu.visible = !$UI.menu.visible
    UI.set($UI)
}

// Toggle the Search button
export const toggleSearch = () => {
    const $UI = get(UI)
    closeMenu()
    $UI.search.visible = !$UI.search.visible
    UI.set($UI)
}
// Toggle the Search button
export const toggleArtistInfo = () => {
    const $UI = get(UI)
    closeMenu()
    $UI.artist.visible = !$UI.artist.visible
    $UI.artist.visible = !$UI.artist.visible
    UI.set($UI)
}

/**
* Togle share display state
*/
    export const toggleShare = function() {
    // Get Writable
    const $UI = get(UI)

    // add 1 to index, then calculate the modulo based on total amount of loop states
    $UI.share.visible =  !$UI.share.visible

    // Update Writable
    UI.set($UI)
}



// Toggle the Login button
export const toggleLogin = () => {
    const $UI = get(UI)
    closeMenu()
    $UI.login.visible = !$UI.login.visible
    UI.set($UI)
}