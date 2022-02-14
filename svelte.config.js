// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-static';
import sveltePreprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: sveltePreprocess({
		scss: {
			includePaths: ['src/', 'node_modules/bootstrap/scss/'],
			importer: [
			  (url) => {
				// Redirect tilde-prefixed imports to node_modules
				if (/^~/.test(url))
				  return { file: `node_modules/${url.replace('~', '')}` };
				return null;
			  },
			],
			quietDeps: true,
		  }
	}),
	kit: {
		adapter: adapter(),

		// Override http methods in the Todo forms
		methodOverride: {
			allowed: ['PATCH', 'DELETE']
		}
	}
};

export default config;
