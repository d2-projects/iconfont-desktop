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
      <app-list>
        <div slot="header" style="height: 108px;"/>
        <router-view/>
      </app-list>
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
          title: '我上传的 icon',
          matchPath: '/manage/me/resources/uploads',
          route: {
            name: 'manage-me-resources-uploads'
          }
        },
        {
          title: '我上传的插画',
          matchPath: '/manage/me/resources/upload-svgs',
          route: {
            name: 'manage-me-resources-upload-svgs'
          }
        },
        {
          title: '我的图标库',
          matchPath: '/manage/me/resources/collections',
          route: {
            name: 'manage-me-resources-collections'
          }
        },
        {
          title: '我的插画库',
          matchPath: '/manage/me/resources/illustrations',
          route: {
            name: 'manage-me-resources-illustrations'
          }
        },
        {
          title: '下载历史',
          matchPath: '/manage/me/resources/histories',
          route: {
            name: 'manage-me-resources-histories'
          }
        }
      ]
    }
  }
}
</script>
