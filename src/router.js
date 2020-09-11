import { find, get } from 'lodash-es'
import Vue from 'vue'
import Router from 'vue-router'
import routes from 'vue-auto-routing'
import { createRouterLayout } from 'vue-router-layout'
import store from './store'

const push = Router.prototype.push
Router.prototype.push = function (location) {
  return push.call(this, location).catch(err => err)
}
const replace = Router.prototype.replace
Router.prototype.replace = function (location) {
  return replace.call(this, location).catch(err => err)
}

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

router.beforeEach(async (to, from, next) => {
  const settingIsLoaded = store.state.setting.isLoaded
  // 加载软件设置
  if (!settingIsLoaded) {
    await store.dispatch('setting/loadSetting')
  }
  // 访问需要 SKD 的页面 需要初始化 SDK
  if (find(to.matched, { meta: { sdk: true } }) && !sdk.isReady()) {
    next({
      name: 'sys-init',
      query: {
        redirect: to.fullPath
      }
    })
  } else {
    next()
  }
})

export default router

function isMenu (route) {
  return route.meta && route.meta.title && route.meta.icon
}

function createMenu (route) {
  return {
    label: route.meta.title,
    value: route.name || get(find(route.children, { path: '' }), 'name', 'index'),
    icon: route.meta.icon,
    sort: route.meta.sort || 0
  }
}

function sortMenu (a, b) {
  return a.sort - b.sort
}

function findRoutesBy (query) {
  return get(find(routes, query), 'children', [])
}

export const menus = {
  setting: findRoutesBy({ path: 'setting' })
    .filter(isMenu)
    .map(createMenu)
    .sort(sortMenu),
  nav: routes
    .filter(isMenu)
    .map(createMenu)
    .sort(sortMenu)
}
