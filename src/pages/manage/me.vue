<style lang="scss">
@include b(page-manage-me) {
  @extend .absolute-parent;
  @include e(topbar) {
    z-index: 1;
    @extend .absolute-top;
  }
  @include e(content) {
    @extend .absolute-all;
  }
}
</style>

<template>
  <div class="app-page-manage-me">
    <div class="app-page-manage-me__content">
      <router-view/>
    </div>
    <div class="app-page-manage-me__topbar">
      <app-nav-group-tabs :options="children"/>
    </div>
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
