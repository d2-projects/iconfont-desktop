import path from 'path'
import { isEmpty } from 'lodash-es'
import { remote } from 'electron'
import { writeFile, readFileAsObject } from '@/utils/file.js'

const app = remote.app

// 设置配置文件
const settingFolder = path.join(app.getPath('userData'), 'setting')
const settingFileName = 'setting.json'

export default {
  namespaced: true,
  state: {
    isLoaded: false,
    setting: {
      // 默认下载地址
      'folder.download.icon': path.join(app.getPath('downloads'), 'iconfont-desktop', 'icons'),
      'folder.download.illustration': path.join(app.getPath('downloads'), 'iconfont-desktop', 'illustrations')
    }
  },
  actions: {
    /**
     * @description 从文件加载设置 如果不存在 将当前设置保存
     */
    async loadSetting ({ state, dispatch }) {
      const setting = await readFileAsObject(settingFolder, settingFileName)
      if (isEmpty(setting)) await dispatch('saveSetting')
      else state.setting = setting
      state.isLoaded = true
    },
    /**
     * @description 保存当前设置到文件
     */
    async saveSetting ({ state }) {
      await writeFile(settingFolder, settingFileName, JSON.stringify(state, null, 2))
    },
    /**
     * @description 设置某个项目
     * @param {String} name 项目名
     * @param {Any} value 项目值
     */
    async set ({ state, dispatch }, { name = '', value = '' }) {
      state.setting[name] = value
      await dispatch('saveSetting')
    }
  },
  mutations: {
    get (state, name = '') {
      return state.setting[name]
    }
  }
}
