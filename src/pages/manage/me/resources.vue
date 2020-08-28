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
