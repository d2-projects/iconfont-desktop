<style lang="scss">
@include b(icon-render) {
  font-size: 26px;
  line-height: 26px;
  svg {
    max-width: 70%;
  }
}
</style>

<template>
  <i v-html="value" class="app-icon-render"/>
</template>

<script>
export default {
  name: 'app-icon-render',
  props: {
    value: {
      type: String,
      default: ''
    }
  }
}
</script>
