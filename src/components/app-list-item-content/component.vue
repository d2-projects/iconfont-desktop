<style lang="scss">
@include b(list-item-content) {
  @extend .absolute-all;
  @include e(layer) {
    @extend .absolute-all;
  }
  @include e(selected) {
    box-shadow: map-get($blue, 'darken-2') 0px 0px 0px 2px inset;
    background-color: map-get($blue, 'lighten-5');
  }
}
</style>

<template>
  <app-square
    class="
      app-list-item-content
      white
      rounded
      is-pointer
    ">
    <!-- 用来显示边框 -->
    <div
      v-show="selected"
      class="
        app-list-item-content__layer
        app-list-item-content__selected
        rounded
      "/>
    <!-- 用来显示内容 -->
    <div
      class="app-list-item-content__layer"
      flex="main:center cross:center">
      <slot/>
    </div>
  </app-square>
</template>

<script>
export default {
  name: 'app-list-item-content',
  props: {
    selected: {
      type: Boolean
    }
  }
}
</script>
