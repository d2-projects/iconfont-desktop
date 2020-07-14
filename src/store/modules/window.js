import { fromPairs } from 'lodash-es'
import { remote } from 'electron'

function runOnWindow (callback) {
  const win = remote.BrowserWindow.getFocusedWindow()
  if (win) {
    callback(win)
  }
}

const events = [
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

const methods = [
  'close',
  'hide',
  'show',
  'maximize',
  'unmaximize',
  'minimize',
  'restore'
]

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
      runOnWindow(win => {
        win.removeAllListeners()
        events.forEach(name => {
          win.on(name, () => {
            console.log(name)
            commit('refreshStatus')
          })
        })
      })
    },
    ...fromPairs(
      methods.map(
        name => [
          name,
          () => {
            runOnWindow(win => win[name]())
          }
        ]
      )
    ),
    toggleFullScreen ({ state }) {
      runOnWindow(win => win.setFullScreen(!state.isFullScreen))
    },
    toggleAlwaysOnTop ({ state }) {
      runOnWindow(win => win.setAlwaysOnTop(!state.isAlwaysOnTop))
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
      runOnWindow(win => {
        state.isMaximized = win.isMaximized()
        state.isMinimized = win.isMinimized()
        state.isFullScreen = win.isFullScreen()
        state.isAlwaysOnTop = win.isAlwaysOnTop()
      })
    }
  }
}
