import {
  startsWith,
  fromPairs,
  isEmpty,
  get
} from 'lodash-es'
import {
  remote
} from 'electron'

const BrowserWindow = remote.BrowserWindow
const Iconfont = remote.getGlobal('Iconfont')

// const wait = time => new Promise(resolve => {
//   setTimeout(() => {
//     resolve()
//   }, time)
// })

// + user
//   - avatar: ,
//   - weixin_code: //img.alicdn.com/tfscom/TB1NcQ6GXXXXXcoXFXXwu0bFXXX.png,
//   - alipay_code: ,
//   - id: 636402,
//   - nickname: FairyEver,
//   - email: 66e1982a172db8f8aeebfce7ec49641b@github.oauth.com,
//   - bio: null,
//   - qq: null,
//   - show_email: null,
//   - role: 0,
//   - avatar_file_name: null,
//   - avatar_tiny_file_name: null,
//   - avatar_small_file_name: null,
//   - status: 1,
//   - from_site: null,
//   - last_login_at: null,
//   - account_type: 0,
//   - created_at: 2017-03-24T02:22:48.000Z,
//   - updated_at: 2017-03-24T02:22:51.000Z

export default {
  namespaced: true,
  state: {
    // 核心
    sdk: new Iconfont(),
    // 状态标识
    ready: false,
    loading: false,
    // 数据
    dictionary: Iconfont.dictionary,
    user: {},
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
    async init ({ state, commit }, cookies) {
      commit('loadingSet', true)
      await state.sdk.init(cookies)
      commit('userSet', state.sdk.user)
      commit('readySet', true)
      commit('loadingSet', false)
    },
    iconSearch ({ state }, payload) {
      return state.sdk.iconSearch(payload)
    },
    async logout ({ dispatch }) {
      const win = new BrowserWindow({ show: false })
      await win.webContents.session.clearStorageData()
      win.close()
      await dispatch('init')
    },
    async login ({ state, dispatch }) {
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
            const iconfontCookies = await win.webContents.session.cookies.get({ domain: '.iconfont.cn' })
            await dispatch('init', fromPairs(iconfontCookies.map(e => [e.name, e.value])))
            win.close()
          }
        })
      })
      win.loadURL(state.url.iconfont)
    }
  },
  mutations: {
    ...fromPairs(
      [
        'user',
        'ready',
        'loading'
      ].map(name => [
        `${name}Set`,
        (state, value) => { state[name] = value }
      ])
    )
  }
}
