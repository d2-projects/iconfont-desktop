import { ipcMain, shell, BrowserWindow } from 'electron'

/**
 * @description 使用浏览器打开链接
 * @param {String} link 完整的网页链接
 */
ipcMain.handle('openExternal', async (event, arg) => {
  return shell.openExternal(arg)
})

/**
 * @description 用户选取文件夹
 */
ipcMain.handle('selectFolder', async (event, arg) => {
  const window = BrowserWindow.getFocusedWindow()
  const result = await dialog.showOpenDialog(window, {
    properties: [
      'openDirectory',
      'createDirectory'
    ]
  })
  return result
})
