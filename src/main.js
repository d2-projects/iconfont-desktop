import Vue from 'vue'
import 'flex.css'
import vuetify from '@/plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './components'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created () {
    // 初始化核心 sdk
    this.$store.dispatch('sdk/init')
  }
}).$mount('#app')
