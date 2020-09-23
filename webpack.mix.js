const mix = require('laravel-mix')
// const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const webpack = require('webpack')
const CompressionPlugin = require('compression-webpack-plugin')
require('dotenv').config()

// mix.config.fileLoaderDirs.fonts = 'public/fonts'
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
// const p = `${__dirname}/node_modules/sweetalert2/dist/sweetalert2.all.js`
// const p = /node_modules/, path.resolve(__dirname, 'sweetalert2/dist/sweetalert2.all.js`)
// console.log(`Dosya yolu:${p}`)
// console.log(`Dirname yolu:${__dirname}`)

mix.webpackConfig({
  plugins: [
    new BundleAnalyzerPlugin(),
    new webpack.IgnorePlugin(/\.\/locale$/),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /tr/)
  ],
  externals: {
    jquery: 'jQuery',
    'jquery.dataTables': 'jquery.dataTables',
    moment: 'moment',
    bootstrap: 'bootstrap'
  }
})

mix.copyDirectory('resources/images', 'public/images')
// mix.copy('node_modules/bootstrap/dist/css/bootstrap.min.css', 'public/css/bootstrap.min.css')
mix.copyDirectory('node_modules/@mdi/font/fonts', 'public/fonts')

mix.js('resources/js/main.js', 'public/js')
  .sass('resources/sass/app.scss', 'public/css', {
    prependData: '$env:\'' + process.env.NODE_ENV + '\';'
  })
  .options({
    processCssUrls: false
  })
  .extract([
    'axios',
    'vue',
    'vue-router',
    'vee-validate',
    'admin-lte',
    'vuex',
    'fastclick'
  ])

if (!mix.inProduction()) {
  mix.sourceMaps(true, 'source-map')
  // mix.webpackConfig({ devtool: 'inline-source-map' })
}

if (mix.inProduction()) {
  mix.setResourceRoot('/otomasyon')
  mix.webpackConfig({
    plugins: [
      new CompressionPlugin({
        algorithm: 'gzip',
        test: /\.js$|\.css$|\.html$|\.svg$/,
        threshold: 10240,
        minRatio: 0.8
      })
    ]
  })
}
