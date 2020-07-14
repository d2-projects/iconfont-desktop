<template>
  <v-skeleton-loader
    class="white"
    :height="height"
    :types="{ collection: type }"
    type="collection"
    :loading="loading"
    transition="fade-transition">
    <v-card elevation="0">
      <slot/>
    </v-card>
  </v-skeleton-loader>
</template>

<script>
export default {
  name: 'app-collection-body',
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
