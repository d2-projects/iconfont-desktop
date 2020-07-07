import { remote } from 'electron'

const Iconfont = remote.getGlobal('Iconfont')

export default {
  namespaced: true,
  state: {
    sdk: new Iconfont()
  },
  actions: {
    /**
     * @description 初始化
     * @param {Object} context
     */
    async init ({ state }) {
      await state.sdk.init()
    },
    search ({ state }, payload) {
      return state.sdk.search(payload)
    }
  }
}
