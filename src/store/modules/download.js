import DownloadTask from '@/lib/download-task'
import path from 'path'
import { remote } from 'electron'

const app = remote.app

console.log(app)
console.log(path)
console.log(DownloadTask)
console.log(app.getPath('userData'))

export default {
  namespaced: true,
  state: {
    list: []
  },
  actions: {
    demo ({ state, commit, dispatch }) {}
  },
  mutations: {
    demo (state) {}
  }
}
