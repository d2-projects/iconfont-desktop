// import { find, get } from 'lodash-es'
import Vue from 'vue'
import Router from 'vue-router'
import routes from 'vue-auto-routing'
import { createRouterLayout } from 'vue-router-layout'
import store from './store'

// const push = Router.prototype.push
// Router.prototype.push = function (location) {
//   return push.call(this, location).catch(err => err)
// }
// const replace = Router.prototype.replace
// Router.prototype.replace = function (location) {
//   return replace.call(this, location).catch(err => err)
// }

const sdk = store.state.sdk.sdk

Vue.use(Router)

const RouterLayout = createRouterLayout(layout => {
  return import('@/layouts/' + layout + '/index.js')
})

const router = new Router({
  routes: [
    {
      path: '/',
      component: RouterLayout,
      children: routes
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.sdk && !sdk.isReady()) {
    console.log('需要 SDK 初始化')
    next({
      name: 'init'
    })
  } else {
    next()
  }
})

export default router

// export const menusSetting = get(find(routes, { path: 'setting' }), 'children', [])
//   .filter(route => route.meta && route.meta.title && route.meta.icon)
//   .map(route => ({
//     label: route.meta.title,
//     value: route.name,
//     icon: route.meta.icon
//   }))

// export const menusNavigation = routes
//   .filter(route => route.meta && route.meta.title && route.meta.icon)
//   .map(route => ({
//     label: route.meta.title,
//     value: route.name || get(find(route.children, { path: '' }), 'name', 'index'),
//     icon: route.meta.icon
//   }))
