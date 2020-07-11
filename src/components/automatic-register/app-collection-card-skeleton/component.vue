<template>
  <v-skeleton-loader
    class="white"
    height="350"
    type="list-item-avatar-two-line, image, list-item-two-line"
    v-bind="$attrs">
    <slot></slot>
  </v-skeleton-loader>
</template>

<script>
export default {
  name: 'app-collection-card-skeleton'
}
</script>
