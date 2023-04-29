//import { writable as persistent } from "svelte-local-storage-store"
import { readable, writable, get, derived } from 'svelte/store'
import { browser } from "$app/environment";

export const state = writable({})
export const moved = writable(false)
export const snapto = writable(false)

//export const sitelang = persistent('frontend_lang', 'en')
//export const cookies = persistent('cookieconsent_status', false)
//export const gateway = persistent('gateway', {})

export const sitelang = !browser || !typeof localStorage.sitelang ? writable('en') : writable(browser && localStorage.sitelang || 'en')
sitelang.subscribe((value) => browser && (localStorage.setItem(`sitelang`, value)))

export const cookies = !browser || !typeof localStorage.cookies ? writable(false) : writable(JSON.parse(browser && localStorage.cookies || false))
cookies.subscribe((value) => browser && (localStorage.setItem(`cookies`, value)))

export const gateway = !browser || !typeof localStorage.gateway ? writable({}) : writable(JSON.parse(browser &&  localStorage.gateway || '{}'))
gateway.subscribe((value) => browser && (localStorage.setItem(`gateway`, JSON.stringify(value))))


export const variables = {
  site: import.meta.env.VITE_SITE || '_us',
  siteurl: { "_us": 'https://www.urosystem.com', "_ud": 'https://www.urodapter.com', "_na": 'https://www.urodapter.us' }
}