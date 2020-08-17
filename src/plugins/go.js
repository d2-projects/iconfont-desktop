import Vue from 'vue'
import router from '@/router'

Vue.prototype.$go = {
  user: {
    detail (id) {
      router.replace({
        name: 'user-detail',
        query: { id }
      })
    }
  },
  illustration: {
    detail (id) {
      router.replace({
        name: 'illustration-detail',
        query: { id }
      })
    }
  },
  collection: {
    detail (id) {
      router.replace({
        name: 'collection-detail',
        query: { id }
      })
    }
  },
  icons: {
    search (keyword) {
      router.replace({
        name: 'icons',
        query: { keyword }
      })
    }
  },
  setting: {
    account () {
      router.replace({ name: 'setting-account' })
    }
  }
}
