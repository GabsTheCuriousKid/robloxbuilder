import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	logLevel: 'info',
	optimizeDeps: {
		include: [
			'@blockly/continuous-toolbox',
			'file-saver',
		]
	},
	build: {
		sourcemap: true
	},
	ssr: {
    	noExternal: ['tree-sitter', 'tree-sitter-lua']
  	}
});