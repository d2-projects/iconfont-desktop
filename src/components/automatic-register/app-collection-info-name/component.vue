<style lang="scss">
@include b(collection-info-name) {
  @include e(main) {
    position: relative;
  }
  @include e(content) {
    @extend %absoluteAll;
  }
}
</style>

<template>
  <span class="app-collection-info-name d-flex align-center flex-grow-1">
    <v-icon size="22" left>mdi-subtitles-outline</v-icon>
    <div class="app-collection-info-name__main align-self-stretch flex-grow-1">
      <div class="app-collection-info-name__content is-nowrap">
        {{ value }}
      </div>
    </div>
  </span>
</template>

<script>
export default {
  name: 'app-collection-info-name',
  props: {
    value: {
      type: String,
      default: ''
    }
  }
}
</script>
