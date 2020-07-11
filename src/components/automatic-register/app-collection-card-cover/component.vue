<style lang="scss">
@include b(collection-card-cover) {
  overflow: hidden;
  @include e(responsive) {
    width: 20%;
    float: left;
  }
}
</style>

<template>
  <div class="app-collection-card-cover">
    <app-icon-render
      v-for="(item, itemIndex) of value"
      :key="itemIndex"
      :value="item.show_svg"
      class="app-collection-card-cover__responsive"/>
  </div>
</template>

<script>
export default {
  name: 'app-collection-card-cover',
  props: {
    value: {
      type: Array,
      default: () => []
    }
  }
}
</script>
