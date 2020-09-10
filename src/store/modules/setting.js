import { get } from 'lodash-es'

export default {
  namespaced: true,
  state: {
    setting: {
      // 默认下载地址
      'download.folder': ''
    }
  },
  mutations: {
    get (state, { name = '', defaultValue = '' }) {
      return get(state.setting, name, defaultValue)
    },
    set (state, { name = '', value = '' }) {
      state.setting[name] = value
    }
  }
}
