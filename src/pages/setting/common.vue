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
  <app-setting-list
    label-position="left"
    label-align="right"
    title="资源下载"
    description="资源类文件的下载设置">
    <app-setting-list-header title="图标" description="图标下载相关设置" sub/>
    <app-setting-list-item-select-folder label="存放位置" store="setting:folder.download.icon"/>
    <app-setting-list-header title="插画" description="插画下载相关设置" sub/>
    <app-setting-list-item-select-folder label="存放位置" store="setting:folder.download.illustration"/>
  </app-setting-list>
</template>
