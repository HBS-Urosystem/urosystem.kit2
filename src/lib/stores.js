import { writable as persistent } from "svelte-local-storage-store"
import { writable/*, readable, derived*/ } from 'svelte/store'

export const state = writable({})
export const moved = writable(false)
export const snapto = writable(false)
export const sitelang = persistent('frontend_lang', 'en')
//export const pagepath = writable()
//export const sitelang = writable('en')
export const cookies = persistent('cookieconsent_status', false)
//export const gateway = persistent('gateway', {})
export const gateway = writable({})

//import { persist, localStorage, cookieStorage } from "@macfja/svelte-persistent-store"
//export let name = persist(writable("John"), localStorage(), "name")

//export let lang = persist(writable('en'), cookieStorage(), 'frontend_lang')
//export let cookies = persist(writable(false), cookieStorage(), 'cookieconsent_status')
//export const moved = writable(false)
