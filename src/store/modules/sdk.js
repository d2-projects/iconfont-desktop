import { get } from 'lodash-es'
import { remote } from 'electron'

const Iconfont = remote.getGlobal('Iconfont')

// const wait = time => new Promise(resolve => {
//   setTimeout(() => {
//     resolve()
//   }, time)
// })

// user

// "avatar": "",
// "weixin_code": "//img.alicdn.com/tfscom/TB1NcQ6GXXXXXcoXFXXwu0bFXXX.png",
// "alipay_code": "",
// "id": 636402,
// "nickname": "FairyEver",
// "email": "66e1982a172db8f8aeebfce7ec49641b@github.oauth.com",
// "bio": null,
// "qq": null,
// "show_email": null,
// "role": 0,
// "avatar_file_name": null,
// "avatar_tiny_file_name": null,
// "avatar_small_file_name": null,
// "status": 1,
// "from_site": null,
// "last_login_at": null,
// "account_type": 0,
// "created_at": "2017-03-24T02:22:48.000Z",
// "updated_at": "2017-03-24T02:22:51.000Z"

export default {
  namespaced: true,
  state: {
    sdk: new Iconfont(),
    ready: false,
    loading: false,
    dictionary: Iconfont.dictionary,
    user: null,
    iconCount: 0
  },
  getters: {
    isLogged: state => {
      return !!state.user
    },
    userName: state => {
      return get(state, 'user.nickname', '')
    }
  },
  actions: {
    async init ({ state, dispatch }, cookies) {
      state.loading = true
      await state.sdk.init(cookies)
      state.ready = true
      state.loading = false
      dispatch('pubinfo')
    },
    search ({ state }, payload) {
      return state.sdk.search(payload)
    },
    async pubinfo ({ state, commit }) {
      const result = await state.sdk.pubinfo()
      commit('userSet', result.user)
    }
  },
  mutations: {
    userSet (state, value) {
      state.user = value || null
    }
  }
}
