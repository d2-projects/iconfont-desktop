<route>
{
  "meta": {
    "title": "下载管理",
    "icon": "mdi-arrow-down-bold-box-outline",
    "sort": 2
  }
}
</route>

<template>
  <app-setting-list>
    下载任务
  </app-setting-list>
</template>

<script>
export default {
  async mounted () {
    this.$store.dispatch('download/taskCreat', {
      url: 'https://iconfont.alicdn.com/s/bf1bff48-81b2-4c0b-9a2c-5181b240e1cf_origin.svg',
      folder: await this.$store.dispatch('setting/get', 'download.illustration.folder'),
      override: await this.$store.dispatch('setting/get', 'download.illustration.override'),
      name: '信息',
      autoStart: true
    })
  }
}
</script>
