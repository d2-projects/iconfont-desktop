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
          title: '资源',
          matchPath: '/manage/me/resources',
          route: {
            name: 'manage-me-resources-uploads'
          }
        },
        {
          title: '收藏',
          matchPath: '/manage/me/likes',
          route: {
            name: 'manage-me-likes-icons'
          }
        },
        {
          title: '项目',
          matchPath: '/manage/me/projects',
          route: {
            name: 'manage-me-projects-sponsor'
          }
        }
      ]
    }
  }
}
</script>
