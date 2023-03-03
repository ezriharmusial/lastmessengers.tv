import type { Howl } from "howler";
import { get, writable, type Writable } from "svelte/store";

export interface Artist {
    nav_label: string
    image: string
    title: string
    name: string
    genres: string[]

}

export interface Album {

}

export interface Media {
    alignImage: string
    theme: string
    bg: string
    bgColor: string
    bgBlend: string
    bgSize: string
    bgOpacity: string
    bgPosition: string
    color: string
    excerpt: string
    featuring: string[]
    genres: string[]
    howl: any
    isIndexFile: Boolean
    image: string
    media_file: string
    nav_label: string
    next: Media | undefined
    previous: Media | undefined
    preview: { html: string, text: string }
    producer: string
    quote: string
    date: Date
    release_album: string
    slug: string
    title: string
    artist: string
    order: number
}

export interface MediaCollection {
    media: Media[],
    selected: Media | undefined
}

export interface Genre {
    title: string
    description: string
}

export const artists:Writable<Artist[]> = writable([])
export const media:Writable<MediaCollection> = writable({media: [], selected: undefined})
export const albums = writable(<Album>[])

export function getArtistImage(artistName:string) {
    const $artists = get(artists)
    return $artists?.find(artist => artist.title == artistName)?.image
}