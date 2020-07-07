import { remote } from 'electron'

const Iconfont = remote.getGlobal('Iconfont')

export default {
  namespaced: true,
  state: {
    sdk: new Iconfont(),
    ready: false,
    loading: false
  },
  actions: {
    /**
     * @description 初始化
     * @param {Object} context
     */
    async init ({ state }) {
      this.loading = true
      await state.sdk.init()
      this.ready = true
      this.loading = false
    },
    search ({ state }, payload) {
      return state.sdk.search(payload)
    }
  }
}
