<style lang="scss">
@include b(icon-render) {
  svg {
    max-width: 70%;
  }
}
</style>

<template>
  <i
    v-html="value"
    class="app-icon-render"
    :style="style"
    flex="main:center cross:center"/>
</template>

<script>
export default {
  name: 'app-icon-render',
  props: {
    value: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 26
    }
  },
  computed: {
    style () {
      return {
        fontSize: this.size + 'px',
        lineHeight: this.size + 'px'
      }
    }
  }
}
</script>
