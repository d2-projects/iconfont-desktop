import { fromPairs } from 'lodash-es'
import { remote } from 'electron'

function win () {
  return remote.BrowserWindow.getFocusedWindow()
}

export default {
  namespaced: true,
  state: {
    isMaximized: false,
    isMinimized: false,
    isFullScreen: false,
    isAlwaysOnTop: false
  },
  actions: {
    init ({ commit }) {
      const names = [
        'resize',
        'move',
        'maximize',
        'unmaximize',
        'minimize',
        'restore',
        'enter-full-screen',
        'leave-full-screen',
        'always-on-top-changed'
      ]
      names.forEach(name => {
        win().on(name, () => {
          commit('refreshStatus')
        })
      })
    },
    ...fromPairs([
      'close',
      'hide',
      'show',
      'maximize',
      'unmaximize',
      'minimize',
      'restore'
    ].map(name => [name, () => { win()[name]() }])),
    toggleFullScreen ({ state }) {
      win().setFullScreen(!state.isFullScreen)
    },
    toggleAlwaysOnTop ({ state }) {
      win().setAlwaysOnTop(!state.isAlwaysOnTop)
    },
    toggleMaximize ({ state, dispatch }) {
      if (state.isMaximized) dispatch('unmaximize')
      else dispatch('maximize')
    },
    toggleMinimize ({ state, dispatch }) {
      if (state.isMinimized) dispatch('restore')
      else dispatch('minimize')
    }
  },
  mutations: {
    refreshStatus (state) {
      state.isMaximized = win().isMaximized()
      state.isMinimized = win().isMinimized()
      state.isFullScreen = win().isFullScreen()
      state.isAlwaysOnTop = win().isAlwaysOnTop()
    }
  }
}
