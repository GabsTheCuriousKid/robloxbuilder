import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
        alias: {
            'blockly': 'blockly/core',
			'@blockly/continuous-toolbox': '@blockly/continuous-toolbox',
            'blockly/msg/en': 'blockly/msg/en',
        }
    },
	optimizeDeps: {
		include: [
			'blockly',
			'blockly/msg/en',
			'@blockly/continuous-toolbox',
			'file-saver',
		]
	},
	build: {
		sourcemap: true
	}
});