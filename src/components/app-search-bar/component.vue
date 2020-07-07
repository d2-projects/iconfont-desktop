<style lang="scss">
@include b(search-bar) {
}
</style>

<template>
  <div class="app-search-bar pa-2">
    <v-text-field
      label="搜索"
      append-icon="mdi-magnify"
      filled
      clearable
      rounded
      single-line
      autofocus
      hide-details/>
  </div>
</template>

<script>
export default {
  name: 'app-search-bar'
}
</script>
