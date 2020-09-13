import { ipcMain, shell } from 'electron'

/**
 * @description 使用浏览器打开链接
 * @param {String} link 完整的网页链接
 */
ipcMain.handle('openExternal', async (event, link) => {
  return shell.openExternal(link)
})
