const path = require('path')
console.log(process.argv[process.argv.length - 1])
module.exports = {
  publicPath: './',
  outputDir:'dist',
  assetsDir: 'static',
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
  css: {
    loaderOptions: {
      sass: {
        // 根据自己样式文件的位置调整
        data: `@import "@/assets/scss/color.scss";`,
        // data: `@import "@/assets/scss/common.scss";`
      }
    }
  }
}

const resolve = function(dir){
  return path.join(__dirname, dir)
}