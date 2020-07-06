/* eslint-disable no-template-curly-in-string */

module.exports = {
  pluginOptions: {
    autoRouting: {
      chunkNamePrefix: 'page-'
    },
    electronBuilder: {
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
  transpileDependencies: [
    'vuetify'
  ]
}
