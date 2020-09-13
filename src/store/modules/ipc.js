import { ipcRenderer } from 'electron'

export default {
  namespaced: true,
  actions: {
    /**
     * @description 使用默认应用程序管理文件和 url
     * @description 同 electron.shell.openExternal
     * @param {Object} context 
     * @param {String} href 需要打开的目标
     */
    openExternal (context, href) {
      return ipcRenderer.invoke('openExternal', href)
    }
  }
}
