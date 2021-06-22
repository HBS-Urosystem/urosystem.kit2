//import adapter from '@sveltejs/adapter-static'
import adapter from '@sveltejs/adapter-netlify'
import { mdsvex } from "mdsvex"
import { mdsvexConfig } from "./mdsvex.config.js"
/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: [".svelte", ...mdsvexConfig.extensions],
	preprocess: [
		mdsvex(mdsvexConfig)
	],
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		adapter: adapter({
			// default options are shown
			pages: 'build',
			assets: 'build',
			fallback: null
		})
	}
};

export default config;
