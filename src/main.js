import Vue from 'vue'
import 'flex.css'
import vuetify from '@/plugins/vuetify'
import '@/plugins/go'
import '@/plugins/toasted'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import '@/components'
import '@/filters'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
