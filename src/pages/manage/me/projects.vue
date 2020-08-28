<style lang="scss">
@include b(page-manage-me-projects) {
  @extend .absolute-parent;
  @include e(topbar) {
    z-index: 1;
    @extend .absolute-top;
    @extend .backdrop;
  }
  @include e(content) {
    @extend .absolute-all;
  }
}
</style>

<template>
  <div class="app-page-manage-me-projects">
    <div class="app-page-manage-me-projects__content">
      <app-list>
        <div slot="header" style="height: 108px;"/>
        <router-view/>
      </app-list>
    </div>
    <div ref="topbar" class="app-page-manage-me-projects__topbar">
      <div style="height: 48px;"/>
      <v-container class="px-0">
        <app-center>
          <app-nav-group-buttons :options="children"/>
        </app-center>
      </v-container>
    </div>
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
