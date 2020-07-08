<style lang="scss">
@include b(icon-list-item) {
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  background-color: rgba(#000, .03);
  &:hover {
    background-color: rgba(#000, .05);
  }
  @include e(icon) {
    height: 100%;
    width: 100%;
    font-size: 48px;
    line-height: 48px;
    svg {
      max-width: 80%;
    }
  }
}
</style>

<template>
  <v-responsive class="app-icon-list-item" :aspect-ratio="1">
    <div
      class="app-icon-list-item__icon"
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
