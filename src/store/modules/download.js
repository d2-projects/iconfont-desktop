import Downloader from '@/lib/downloader'

export default {
  namespaced: true,
  state: {
    tasks: []
  },
  actions: {
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
