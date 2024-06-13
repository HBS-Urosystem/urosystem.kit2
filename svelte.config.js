import { mdsvex } from "mdsvex";
import mdsvexConfig from "./mdsvex.config.js";
import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-netlify";
import htmlMinifierAdaptor from "sveltekit-html-minifier";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte", ...mdsvexConfig.extensions],

  kit: {
    adapter: htmlMinifierAdaptor(
      adapter(/*{
        fallback: 'index.html' // may differ from host to host
      }*/),
      {
        minifierOptions: {
          // https://github.com/terser/html-minifier-terser#options-quick-reference
          minifyCSS: true,
          minifyJS: true,
          removeComments: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          preserveLineBreaks: true,
        },
      }
    ),
    prerender: {
      //"force": true,
      crawl: true,
      entries: ["/*/contact"]
    }
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
