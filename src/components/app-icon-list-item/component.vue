<style lang="scss">
@include b(icon-list-item) {
  border-radius: 4px;
  cursor: pointer;
  @include e(icon) {
    height: 100%;
    width: 100%;
    font-size: 64px;
    line-height: 64px;
    svg {
      max-width: 70%;
    }
  }
}
</style>

<template>
  <v-responsive class="app-icon-list-item" :aspect-ratio="1">
    <div
      class="app-icon-list-item__icon grey lighten-5"
      v-html="value.show_svg"
      flex="main:center cross:center"/>
  </v-responsive>
</template>

<script>
export default {
  name: 'app-icon-list-item',
  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
