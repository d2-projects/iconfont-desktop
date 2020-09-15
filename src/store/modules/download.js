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
      override = false,
      autoStart = true
    }) {
      await createFolder(folder)
      const downloader = new DownloaderHelper(url, folder, {
        fileName: fileName || path.parse(url).base,
        override
      })
      downloader.on('progress', stats => {})
      downloader.on('end', info => {})
      // 自动启动
      if (autoStart) {
        // downloader.start()
      }
    }
  },
  mutations: {
    taskPush (state, data) {
      state.tasks.push(data)
    }
  }
}
