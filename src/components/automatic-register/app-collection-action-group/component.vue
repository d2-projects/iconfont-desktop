<style lang="scss">
@include b(collection-action-group) {
  border-top: 1px solid map-get($grey, 'lighten-4');
}
</style>

<template>
  <v-card-actions class="app-collection-action-group d-flex flex-row-reverse">
    <slot/>
  </v-card-actions>
</template>

<script>
export default {
  name: 'app-collection-action-group'
}
</script>
