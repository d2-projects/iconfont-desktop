<template>
  <div>
    <app-links-btn-group :options="children"/>
    <router-view/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      children: [
        {
          title: '我收藏的图标',
          matchPath: '/manage/me/likes/icons',
          route: {
            name: 'manage-me-likes-icons'
          }
        },
        {
          title: '我收藏的图标库',
          matchPath: '/manage/me/likes/library',
          route: {
            name: 'manage-me-likes-library'
          }
        },
        {
          title: '我收藏的插画库',
          matchPath: '/manage/me/likes/illustration',
          route: {
            name: 'manage-me-likes-illustration'
          }
        }
      ]
    }
  }
}
</script>
