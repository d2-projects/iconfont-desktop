/* eslint-disable no-template-curly-in-string */
const path = require('path')

module.exports = {
  publicPath: '/',
  css: {
    loaderOptions: {
      // 设置 scss 公用变量文件
      sass: {
        prependData: '@import \'~@/assets/style/index.scss\';'
      }
    }
  },
  pluginOptions: {
    autoRouting: {
      chunkNamePrefix: 'page-'
    },
    electronBuilder: {
      nodeIntegration: true,
      chainWebpackMainProcess: config => {
        config.module
          .rule('babel')
          .test(/\.js$/)
          .include
          .add(path.resolve(__dirname, 'src/lib/iconfont-sdk'))
          .add(path.resolve(__dirname, 'src/background.js'))
          .end()
          .use('babel')
          .loader('babel-loader')
          .options({
            presets: [
              [
                '@babel/preset-env',
                {
                  modules: false,
                  targets: {
                    electron: '9'
                  }
                }
              ]
            ],
            plugins: ['@babel/plugin-proposal-class-properties']
          })
      },
      builderOptions: {
        publish: {
          provider: 'generic',
          url: 'https://cdn.d2.pub/mirrors/d2-projects/iconfont-desktop/releases/latest/'
        },
        productName: 'iconfont-desktop',
        artifactName: '${productName}-${version}.${ext}',
        win: {
          signAndEditExecutable: false,
          target: [
            'nsis',
            'portable'
          ]
        },
        portable: {
          artifactName: '${productName}-portable-${version}.${ext}'
        }
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule('md')
      .test(/\.md$/)
      .use('text-loader')
      .loader('text-loader')
      .end()
  }
}
