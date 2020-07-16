<style lang="scss">
@include b(icon-render) {
  @include e(content) {
    height: 100%;
    width: 100%;
    font-size: 26px;
    line-height: 26px;
    svg {
      max-width: 70%;
    }
  }
}
</style>

<template>
  <v-responsive class="app-icon-render" :aspect-ratio="1">
    <div
      v-html="value"
      class="app-icon-render__content"
      flex="main:center cross:center">
    </div>
  </v-responsive>
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
