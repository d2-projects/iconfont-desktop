import Vue from 'vue'
import 'flex.css'
import Toasted from 'vue-toasted'
import vuetify from '@/plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './components'
import './filters'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false

Vue.use(Toasted)

Vue.toasted.register('app_success', payload => (payload && payload.message) || '成功', {
  type: 'success',
  theme: 'toasted-primary',
  duration: 1000
})

Vue.toasted.register('app_error', payload => (payload && payload.message) || 'SDK 错误', {
  type: 'show',
  theme: 'toasted-primary',
  duration: 3000,
  action: {
    text: '关闭',
    onClick: (e, toastObject) => {
      toastObject.goAway(0)
    }
  }
})

Vue.prototype.$go = {
  datail: {
    user (id) {
      this.$router.replace({
        name: 'user-detail',
        query: {
          id
        }
      })
    }
  }
}

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  mounted () {
    store.dispatch('window/init')
  }
}).$mount('#app')
