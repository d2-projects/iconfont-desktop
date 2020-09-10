import {
  startsWith,
  fromPairs,
  isEmpty,
  get
} from 'lodash-es'
import { remote } from 'electron'

import { wait, getCookiesFromIconfont } from '@/utils/tools.js'

const BrowserWindow = remote.BrowserWindow
const Iconfont = remote.getGlobal('Iconfont')

export default {
  namespaced: true,
  state: {
    // 核心
    sdk: new Iconfont(),
    // 状态标识
    loading: false,
    loadingMessage: '',
    // 数据
    dictionary: Iconfont.dictionary,
    user: {},
    iconCount: 0,
    // 设置
    url: {
      iconfont: 'https://www.iconfont.cn/',
      githubLogin: 'https://www.iconfont.cn/api/login/github',
      githubLoginCallback: 'https://www.iconfont.cn/api/login/github/callback',
      weiboLogin: 'https://www.iconfont.cn/api/login/weibo'
    }
  },
  getters: {
    isLogged: state => {
      return !isEmpty(state.user)
    },
    userName: state => {
      return get(state, 'user.nickname', '')
    },
    iconSearchPlaceholder: state => {
      return state.iconCount
        ? `在 ${state.iconCount.toLocaleString()} 个图标中搜索`
        : '搜索'
    }
  },
  actions: {
    refresh ({ state, commit }) {
      commit('userSet', state.sdk.user)
      commit('iconCountSet', state.sdk.iconCount)
    },
    async loading ({ commit }, { promise, message = '' } = {}) {
      commit('loadingMessageSet', message)
      commit('loadingSet', true)
      await Promise.all([
        promise,
        wait(1000)
      ])
      commit('loadingSet', false)
      commit('loadingMessageSet', '')
    },
    async logout ({ state, dispatch, commit }) {
      const promise = new Promise(async resolve => {
        const win = new BrowserWindow({ show: false })
        await win.webContents.session.clearStorageData()
        await state.sdk.init()
        await dispatch('refresh')
        win.close()
        resolve()
      })
      await dispatch('loading', {
        promise,
        message: '清理信息'
      })
    },
    async autoLogin ({ state, dispatch, commit }) {
      const promise = new Promise(resolve => {
        const win = new BrowserWindow({ show: false })
        win.once('ready-to-show', async () => {
          await state.sdk.init(await getCookiesFromIconfont(win))
          await dispatch('refresh')
          win.close()
          resolve()
        })
        win.loadURL(state.url.iconfont)
      })
      await dispatch('loading', {
        promise,
        message: '正在自动登录'
      })
    },
    async loginWithGithub ({ state, dispatch, commit }) {
      const promise = new Promise(resolve => {
        const win = new BrowserWindow({
          width: 500,
          height: 700,
          show: false
        })
        win.once('ready-to-show', () => {
          win.show()
          const webContents = win.webContents
          webContents.on('did-navigate', async (event, url) => {
            if (startsWith(url, state.url.githubLoginCallback)) {
              // 这个时候一般是 github 返回 iconfont 的时候出错了 -> 重试登录
              commit('loadingMessageSet', '正在自动重试 Github 登录')
              webContents.loadURL(state.url.githubLogin)
            }
            if (url === state.url.iconfont) {
              await state.sdk.init(await getCookiesFromIconfont(win))
              await dispatch('refresh')
              win.close()
            }
          })
        })
        win.loadURL(state.url.githubLogin)
        win.on('close', () => { resolve() })
      })
      await dispatch('loading', {
        promise,
        message: '正在通过 Github 登录'
      })
    },
    async loginWithWeibo ({ state, dispatch, commit }) {
      const promise = new Promise(resolve => {
        const win = new BrowserWindow({
          width: 500,
          height: 700,
          show: false
        })
        win.once('ready-to-show', () => {
          win.show()
          const webContents = win.webContents
          webContents.on('did-navigate', async (event, url) => {
            if (url === state.url.iconfont) {
              await state.sdk.init(await getCookiesFromIconfont(win))
              await dispatch('refresh')
              win.close()
            }
          })
        })
        win.loadURL(state.url.weiboLogin)
        win.on('close', () => { resolve() })
      })
      await dispatch('loading', {
        promise,
        message: '正在通过新浪微博登录'
      })
    }
  },
  mutations: {
    ...fromPairs([
      'user',
      'iconCount',
      'loading',
      'loadingMessage'
    ].map(name => [`${name}Set`, (state, value) => { state[name] = value }]))
  }
}
