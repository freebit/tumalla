// import alias from "@rollup/plugin-alias";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
// import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import html2 from "rollup-plugin-html2";
import svelte from "rollup-plugin-svelte";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";
import livereload from "rollup-plugin-livereload";
import sveltePreprocessor from "svelte-preprocess";

const isProduction = process.env.NODE_ENV === "production";
const isDevelopment = process.env.NODE_ENV === "development";

const plugins = [
  svelte({
    // enable run-time checks when not in production
    dev: isDevelopment,
    // we'll extract any component CSS out into
    // a separate file - better for performance
    extensions: [".svelte"],
    preprocess: sveltePreprocessor(),
    emitCss: true,
    css: css => {
      css.write('./public/build/bundle.css')
    }
  }),
  // alias({
  //   entries: {
  //     "@": 'src/'
  //   }
  // }),
  postcss({
    extract: true,
  }),
  typescript(),
  commonjs({ include: "node_modules/**", extensions: [".js", ".ts"] }),
  // If you have external dependencies installed from
  // npm, you'll most likely need these plugins. In
  // some cases you'll need additional configuration -
  // consult the documentation for details:
  // https://github.com/rollup/plugins/tree/master/packages/commonjs
  resolve({
    browser: true,
    dedupe: ['svelte'],
  }),
  // commonjs(),
  globals(),
  builtins(),
  // json(),
  html2({
    template: "public/index.html",
  }),

  // In dev mode, call `npm run start` once
  // the bundle has been generated
  isDevelopment && serve(),

  // Watch the `public` directory and refresh the
  // browser on changes when not in production
  isDevelopment && livereload('public'),

  // If we're building for production (npm run build
  // instead of npm run dev), minify
  isProduction && terser({ sourcemap: true })
];



export default {
	input: 'src/main.ts',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	plugins,
	watch: {
		clearScreen: false
	}
};

function serve() {
	let started = false;

	return {
		writeBundle() {
			if (!started) {
				started = true;

				require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
					stdio: ['ignore', 'inherit', 'inherit'],
					shell: true
				});
			}
		}
	};
}
