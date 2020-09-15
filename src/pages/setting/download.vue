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
      url: 'https://cdn.d2.pub/files/image-hosting/20200603194141.png',
      folder: await this.$store.dispatch('setting/get', 'download.icon.folder')
    })
  }
}
</script>
