<style lang="scss">
@include b(collection-card-cover) {
  overflow: hidden;
  @include e(responsive) {
    width: 20%;
    float: left;
  }
  @include e(icon-content) {
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
  <div class="app-collection-card-cover">
    <v-responsive
      v-for="(item, itemIndex) of value"
      :key="itemIndex"
      :aspect-ratio="1"
      class="app-collection-card-cover__responsive">
      <div
        v-html="item.show_svg"
        class="app-collection-card-cover__icon-content"
        flex="main:center cross:center">
      </div>
    </v-responsive>
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
