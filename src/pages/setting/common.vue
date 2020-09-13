<route>
{
  "meta": {
    "title": "通用",
    "icon": "mdi-tune",
    "sort": 1
  }
}
</route>

<template>
  <app-setting-list label-position="left" label-align="right">
    <app-setting-list-header title="下载位置" description="管理各类资源的下载设置"/>
    <app-setting-list-item-text label="图标" store="setting:folder.download.icon"/>
  </app-setting-list>
</template>
