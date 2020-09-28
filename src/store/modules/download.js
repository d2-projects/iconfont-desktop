import Downloader from '@/lib/downloader'

export default {
  namespaced: true,
  state: {
    tasks: []
  },
  actions: {
    async setting ({ dispatch }, name = '') {
      return await dispatch('setting/get', name, { root: true })
    },
    async downloadIllustrations ({ dispatch }, data = []) {
      for (const { url, name } of data) {
        const folder = await dispatch('setting', 'download.illustration.folder')
        const override = await dispatch('setting', 'download.illustration.override')
        await dispatch('taskCreat', { url, name, folder, override })
      }
    },
    async taskCreat ({ commit }, payload) {
      commit('taskPush', new Downloader(payload))
    }
  },
  mutations: {
    taskPush (state, task) {
      state.tasks.push(task)
    }
  }
}
