const { defineConfig } = require('@vue/cli-service');
const path = require('path');

const resolveSrc = (_path) => path.join(__dirname, _path);

module.exports = defineConfig({
  transpileDependencies: true,
	lintOnSave: true,
	configureWebpack: {
    // Set up all the aliases we use in our app.
    resolve: {
      alias: {
        assets: resolveSrc('src/assets'),
				// 'vue': '@vue/runtime-dom'
      }
    }
  },
  css: {
    sourceMap: process.env.NODE_ENV !== 'production'
  }
	// chainWebpack: config => {
  //   config.resolve.alias.set(
  //     'vue$',
  //     // If using the runtime only build
  //     path.resolve(__dirname, 'node_modules/vue/dist/vue.runtime.esm.js')
  //     // Or if using full build of Vue (runtime + compiler)
  //     // path.resolve(__dirname, 'node_modules/vue/dist/vue.esm.js')
  //   )
  // },
});
