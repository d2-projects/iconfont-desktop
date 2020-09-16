<style lang="scss">
@include b(square) {
  position: relative;
  @include e(content) {
    @extend .absolute-all;
  }
}
</style>

<template>
  <v-responsive class="app-square" :aspect-ratio="1">
    <!-- 居中显示 -->
    <div
      v-if="center"
      class="app-square__content"
      flex="main:center cross:center">
      <slot/>
    </div>
    <!-- 默认 -->
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
