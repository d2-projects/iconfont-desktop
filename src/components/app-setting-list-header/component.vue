<style lang="scss">
@include b(setting-list-header) {
  border-bottom: 1px solid map-get($grey, 'lighten-4');
}
</style>

<template>
  <div
    class="app-setting-list-header mt-n5 mx-n5 mb-5 px-5 py-3"
    flex="main:justify cross:center">
    <div>
      <div class="text-h6">{{ title }}</div>
      <div class="text-caption">{{ description }}</div>
    </div>
    <div/>
  </div>
</template>

<script>

export default {
  name: 'app-setting-list-header',
  props: {
    title: {
      type: String,
      default: '',
      required: false
    },
    description: {
      type: String,
      default: '',
      required: false
    }
  }
}
</script>
