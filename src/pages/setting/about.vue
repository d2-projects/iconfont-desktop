<route>
{
  "meta": {
    "title": "关于",
    "icon": "mdi-information-outline",
    "sort": 2
  }
}
</route>

<template>
  <app-setting-list>
    <app-markdown-render :value="source"/>
  </app-setting-list>
</template>

<script>
import source from './about.md'
export default {
  data () {
    return {
      source
    }
  }
}
</script>
