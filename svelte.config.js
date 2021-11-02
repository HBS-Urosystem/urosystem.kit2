import adapter from '@sveltejs/adapter-static'
//import adapter from '@sveltejs/adapter-netlify' // forms not submitting. maybe via ajax.
//import preprocess from 'svelte-preprocess'
import { mdsvex } from "mdsvex"
import { mdsvexConfig } from "./mdsvex.config.js"
/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: [".svelte", ...mdsvexConfig.extensions],
	preprocess: [
		mdsvex(mdsvexConfig)/*,
		preprocess()*/
	],
	/*prerender: {
		crawl: true,
		enabled: true,
		entries: ['/ar','/de','/en','/es','/fr','/he','/hu','/it','/ja','/ko','/pt','/ru','/tr','/zh']
	},*/
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		//hydrate: false,
		adapter: adapter()/*{
			// default options for static
			//pages: 'build',
			//assets: 'build',
			//fallback: null
		})*/
	}
};

export default config;
