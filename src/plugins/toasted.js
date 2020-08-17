import Vue from 'vue'
import Toasted from 'vue-toasted'

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
