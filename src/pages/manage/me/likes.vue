<style lang="scss">
@include b(page-manage-me-resources) {
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
  <div class="app-page-manage-me-resources">
    <div class="app-page-manage-me-resources__content">
      <app-scroll-group>
        <div slot="header" style="height: 108px;"/>
        <router-view/>
      </app-scroll-group>
    </div>
    <div ref="topbar" class="app-page-manage-me-resources__topbar">
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
