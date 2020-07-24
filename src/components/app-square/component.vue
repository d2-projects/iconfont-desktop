<style lang="scss">
@include b(square) {
  @include e(content) {
    height: 100%;
    width: 100%;
  }
}
</style>

<template>
  <v-responsive class="app-square" :aspect-ratio="1">
    <div
      v-if="center"
      class="app-square__content"
      flex="main:center cross:center">
      <slot/>
    </div>
    <slot v-else/>
  </v-responsive>
</template>

<script>
export default {
  name: 'app-square',
  props: {
    center: {
      type: Boolean
    }
  }
}
</script>
