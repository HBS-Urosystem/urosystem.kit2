import { mdsvex } from "mdsvex";
import mdsvexConfig from "./mdsvex.config.js";
import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-netlify";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte", ...mdsvexConfig.extensions],

  kit: {
    adapter: adapter(),
    //prerender: {"force": true}
    /*csp:{
      mode:"auto",
      directives:{
        "frame-ancestors": ['none'],
        "default-src": ["https:"],
        "connect-src": ["https:", "wss:"], 
        "script-src":["self", "https:"],
        "style-src":["self", "https:"],
        "object-src":["none"],
        "img-src":["https:", "data:"],
      },
    },*/
  },

  preprocess: [
    preprocess({
      postcss: true,
    }),
    mdsvex(mdsvexConfig),
  ],
};

export default config;
