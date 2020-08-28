<template>
  <div>
    <app-nav-group-button :options="children"/>
    <router-view/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      children: [
        {
          title: '我发起的项目',
          matchPath: '/manage/me/projects/sponsor',
          route: {
            name: 'manage-me-projects-sponsor'
          }
        },
        {
          title: '我参与的项目',
          matchPath: '/manage/me/projects/join',
          route: {
            name: 'manage-me-projects-join'
          }
        },
        {
          title: '我删除的项目',
          matchPath: '/manage/me/projects/delete',
          route: {
            name: 'manage-me-projects-delete'
          }
        }
      ]
    }
  }
}
</script>
