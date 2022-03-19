const path = require( 'path' )

const plugins = []

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/',
  lintOnSave: true,
  productionSourceMap: false,
  runtimeCompiler: true,

  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/scss/meta/_meta.scss";',
      },
    },
  },

  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve( __dirname, 'src' ),
        consts: path.resolve( __dirname, 'src', 'enums', 'consts.js' )
      },
    },
    plugins,
    performance: {
      hints: false
    },
    devServer: {
      overlay: {
        warnings: false,
        errors: true
      }
    }
  },
}
