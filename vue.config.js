const path = require('path')
module.exports = {
  publicPath: './',
  outputDir:'dist',
  assetsDir: 'static',
  css: {
    loaderOptions: {
      scss: {
        // data: `@import "@/assets/scss/color.scss";`,
        prependData: `@import "@/assets/scss/common.scss";`
      }
    }
  },
  chainWebpack: config => {
    config.module.rule('images').use('url-loader').loader('url-loader').tap((options)=>{
      Object.assign(options, {limit: 5120})
    })

    config.resolve.alias.set('@',resolve('src'))
                        .set('@C',resolve('src/components'))
                        .set('@A',resolve('src/assets'))
                        .set('@R',resolve('src/routers'))
                        .set('@S',resolve('src/store'))
                        .set('@P',resolve('src/pages'))
  },
  devServer: {
    port: 9000
  },
  
}

const resolve = function(dir){
  return path.join(__dirname, dir)
}