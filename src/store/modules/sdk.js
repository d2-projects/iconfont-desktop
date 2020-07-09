import { isEmpty, get } from 'lodash-es'
import { remote } from 'electron'

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
    user: {}
  },
  getters: {
    isLogged: state => !isEmpty(state.user),
    userName: state => get(state, 'user.nickname', '')
  },
  actions: {
    async init ({ state, dispatch, commit }, cookies) {
      commit('loadingSet', true)
      await state.sdk.init(cookies)
      commit('userSet', state.sdk.user)
      commit('readySet', true)
      commit('loadingSet', false)
    },
    search ({ state }, payload) {
      return state.sdk.search(payload)
    }
  },
  mutations: {
    userSet (state, value) {
      state.user = value
    },
    readySet (state, value) {
      state.ready = value
    },
    loadingSet (state, value) {
      state.loading = value
    }
  }
}
