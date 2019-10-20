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
  },
  devServer: {
    port: 9000
  },
}

const resolve = function(dir){
  return path.join(__dirname, dir)
}