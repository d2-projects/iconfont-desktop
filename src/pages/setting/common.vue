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
  <app-setting-list label-position="left" label-align="right" title="资源下载" description="资源类文件的下载设置">
    <app-setting-list-header title="图标" description="图标下载相关设置" sub/>
    <app-setting-list-item-select-folder label="存放位置" store="setting:download.icon.folder"/>
    <app-setting-list-item-switch label="覆写" store="setting:download.icon.override"/>
    <app-setting-list-header title="插画" description="插画下载相关设置" sub/>
    <app-setting-list-item-select-folder label="存放位置" store="setting:download.illustration.folder"/>
    <app-setting-list-item-switch label="覆写" store="setting:download.illustration.override"/>
  </app-setting-list>
</template>
