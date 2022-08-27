const { defineConfig } = require('@vue/cli-service');
const path = require('path');

const resolveSrc = (_path) => path.join(__dirname, _path);

module.exports = defineConfig({
  transpileDependencies: true,
	lintOnSave: true,
	configureWebpack: {
    plugins: [
      require('unplugin-auto-import/webpack')({
				dts: true,
				include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/, // .md
        ],
				imports: ['vue', 'vue-router'],
				eslintrc: {
					enabled: true, // Default `false`
				},
			}),
    ],
    resolve: {
      alias: {
        assets: resolveSrc('src/assets'),
        '@utils': resolveSrc('src/utils/'),
        '@plugins': resolveSrc('src/plugins/'),
        '@components': resolveSrc('src/components'),
        '@cc': resolveSrc('src/components'),
        '@use': resolveSrc('src/composables/'),
				// 'vue': '@vue/runtime-dom'
      }
    }
  },
  css: {
    sourceMap: process.env.NODE_ENV !== 'production'
  },
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
