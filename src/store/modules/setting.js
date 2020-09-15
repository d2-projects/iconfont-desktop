import path from 'path'
import { isEmpty, assign } from 'lodash-es'
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
      'download.icon.folder': path.join(app.getPath('downloads'), 'iconfont-desktop', 'icons'),
      'download.icon.override': true,
      'download.illustration.folder': path.join(app.getPath('downloads'), 'iconfont-desktop', 'illustrations'),
      'download.illustration.override': true
    }
  },
  actions: {
    /**
     * @description 从文件加载设置 如果不存在 将当前设置保存
     */
    async loadSetting ({ state, dispatch }) {
      const setting = await readFileAsObject(settingFolder, settingFileName)
      if (isEmpty(setting)) await dispatch('saveSetting')
      else state.setting = assign({}, state.setting, setting)
      await dispatch('saveSetting')
      state.isLoaded = true
    },
    /**
     * @description 保存当前设置到文件
     */
    async saveSetting ({ state }) {
      await writeFile(settingFolder, settingFileName, JSON.stringify(state.setting, null, 2))
    },
    /**
     * @description 设置某个项目
     * @param {String} name 项目名
     * @param {Any} value 项目值
     */
    async set ({ state, commit, dispatch }, { name = '', value = '' }) {
      commit('set', { name, value })
      await dispatch('saveSetting')
    },
    /**
     * @description 获得某个项目
     * @param {String} name 项目名
     */
    async get ({ state, dispatch }, name = '') {
      return state.setting[name]
    }
  },
  mutations: {
    set (state, { name = '', value = '' }) {
      state.setting[name] = value
    }
  }
}
