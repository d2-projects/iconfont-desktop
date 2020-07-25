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
  <div class="app-collection-cover is-pointer" @click="onClick">
    <app-square
      v-for="(item, itemIndex) of value"
      :key="itemIndex"
      class="app-collection-cover__responsive"
      center>
      <app-icon-render :value="item.show_svg" :size="32"/>
    </app-square>
  </div>
</template>

<script>
export default {
  name: 'app-collection-cover',
  props: {
    value: {
      type: Array,
      default: () => []
    },
    id: {
      type: Number,
      default: 0
    }
  },
  methods: {
    onClick () {
      this.$router.replace({
        name: 'collection-detail',
        query: {
          id: this.id
        }
      })
    }
  }
}
</script>
