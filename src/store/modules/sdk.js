import {
  startsWith,
  fromPairs,
  isEmpty,
  get
} from 'lodash-es'
import { remote } from 'electron'

const BrowserWindow = remote.BrowserWindow
const Iconfont = remote.getGlobal('Iconfont')

function wait (time) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

function cookiesToObj (cookies) {
  return fromPairs(cookies.map(e => [e.name, e.value]))
}

async function getIconfontCookies (win, filter = {}) {
  return cookiesToObj(await win.webContents.session.cookies.get({ domain: '.iconfont.cn' }))
}

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
      githubLoginCallback: 'https://www.iconfont.cn/api/login/github/callback'
    }
  },
  getters: {
    isLogged: state => !isEmpty(state.user),
    userName: state => get(state, 'user.nickname', '')
  },
  actions: {
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
        commit('userSet', state.sdk.user)
        commit('iconCountSet', state.sdk.iconCount)
        win.close()
        resolve()
      })
      const message = '清理信息'
      await dispatch('loading', { promise, message })
    },
    async autoLogin ({ state, dispatch, commit }) {
      const promise = new Promise(resolve => {
        const win = new BrowserWindow({ show: false })
        win.once('ready-to-show', async () => {
          await state.sdk.init(await getIconfontCookies(win))
          commit('userSet', state.sdk.user)
          commit('iconCountSet', state.sdk.iconCount)
          win.close()
          resolve()
        })
        win.loadURL(state.url.iconfont)
      })
      const message = '正在自动登录'
      await dispatch('loading', { promise, message })
    },
    async login ({ state, dispatch, commit }) {
      const promise = new Promise(resolve => {
        const win = new BrowserWindow({
          width: 1200,
          height: 700,
          show: false
        })
        win.once('ready-to-show', () => {
          win.show()
          const webContents = win.webContents
          webContents.on('did-navigate', async (event, url) => {
            if (startsWith(url, state.url.githubLoginCallback)) {
              // 这个时候一般是 github 返回 iconfont 的时候出错了
              // 重试登录
              webContents.loadURL(state.url.githubLogin)
            }
            if (url === state.url.iconfont) {
              // 登录完成
              await state.sdk.init(await getIconfontCookies(win))
              commit('userSet', state.sdk.user)
              commit('iconCountSet', state.sdk.iconCount)
              win.close()
            }
          })
        })
        win.loadURL(state.url.iconfont)
        win.on('close', () => { resolve() })
      })
      const message = '正在登录'
      await dispatch('loading', { promise, message })
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
