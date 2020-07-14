<template>
  <v-skeleton-loader
    class="white"
    :height="height"
    :types="{ collection: type }"
    type="collection"
    :loading="loading"
    transition="fade-transition">
    <slot/>
  </v-skeleton-loader>
</template>

<script>
export default {
  name: 'app-collection-skeleton',
  props: {
    type: {
      type: String,
      default: ''
    },
    height: {
      type: Number,
      default: 0
    },
    loading: {
      type: Boolean
    }
  }
}
</script>
