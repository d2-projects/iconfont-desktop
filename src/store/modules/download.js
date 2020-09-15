import path from 'path'
import { DownloaderHelper } from 'node-downloader-helper'
import { createFolder } from '@/utils/file.js'

// https://github.com/hgouveia/node-downloader-helper

// const url = 'http://cdn.d2.pub/mirrors/d2-projects/electron-vue-template/releases/download/v1.25.0/electron-vue-template-portable-1.25.0.exe'

export default {
  namespaced: true,
  state: {
    tasks: []
  },
  actions: {
    async taskCreat ({ state, commit, dispatch }, {
      url = '',
      folder = '',
      fileName = '',
      override = false
    }) {
      await createFolder(folder)
      const dl = new DownloaderHelper(url, folder, {
        fileName: fileName || path.parse(url).base,
        override
      })
      console.log(dl)
      dl.on('progress', stats => {
        // downloaded: 47584
        // name: "electron-vue-template-1.25.0.exe.blockmap; filename*=utf-8''electron-vue-template-1.25.0.exe.blockmap"
        // progress: 100
        // speed: 47584
        // total: 47584
        console.log(stats)
      })
      dl.start()
    }
  }
}
