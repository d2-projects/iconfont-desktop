<style lang="scss">
@include b(collection-cover) {
  overflow: hidden;
  @include e(responsive) {
    width: 20%;
    float: left;
  }
}
</style>

<template>
  <div class="app-collection-cover is-pointer">
    <app-icon-render
      v-for="(item, itemIndex) of value"
      :key="itemIndex"
      :value="item.show_svg"
      class="app-collection-cover__responsive"/>
  </div>
</template>

<script>
export default {
  name: 'app-collection-cover',
  props: {
    value: {
      type: Array,
      default: () => []
    }
  }
}
</script>
