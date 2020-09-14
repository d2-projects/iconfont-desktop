<style lang="scss">
@include b(setting-list-header) {
  @include when(sub) {
    border-left: 2px solid map-get($blue, 'darken-2');
    @extend .pl-3;
  }
}
</style>

<template>
  <div class="app-setting-list-header mb-3" :class="{ 'is-sub': sub }">
    <div :class="sub ? 'text-subtitle-1 font-weight-bold' : 'text-h6'">
      {{ title }}
    </div>
    <div class="text-caption">{{ description }}</div>
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
    },
    sub: {
      type: Boolean
    }
  }
}
</script>
