import Vue from 'vue'
import 'flex.css'
import vuetify from '@/plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './components'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false

// store.dispatch('window/init')

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
