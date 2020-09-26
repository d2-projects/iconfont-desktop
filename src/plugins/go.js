import Vue from 'vue'
import router from '@/router'

Vue.prototype.$go = {
  user: {
    detail (id) {
      router.push({
        name: 'user-detail',
        query: { id }
      })
    }
  },
  illustration: {
    detail (id) {
      router.push({
        name: 'illustration-detail',
        query: { id }
      })
    }
  },
  collection: {
    detail (id) {
      router.push({
        name: 'collection-detail',
        query: { id }
      })
    }
  },
  icons: {
    search (keyword) {
      router.push({
        name: 'icons',
        query: { keyword }
      })
    }
  },
  setting: {
    account () {
      router.push({ name: 'setting-account' })
    }
  }
}
