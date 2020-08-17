import Vue from 'vue'
import router from '@/router'

Vue.prototype.$go = {
  detail: {
    user (id) {
      router.replace({
        name: 'user-detail',
        query: { id }
      })
    },
    illustration (id) {
      router.replace({
        name: 'illustration-detail',
        query: { id }
      })
    },
    collection (id) {
      router.replace({
        name: 'collection-detail',
        query: { id }
      })
    }
  },
  setting: {
    account () {
      router.replace({ name: 'setting-account' })
    }
  }
}
