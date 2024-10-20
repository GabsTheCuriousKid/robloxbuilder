import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
        alias: {
            'blockly': 'blockly/core',
        }
    },
	optimizeDeps: {
		include: [
			'@blockly/continuous-toolbox',
			'file-saver',
		]
	},
	build: {
		sourcemap: true
	}
});