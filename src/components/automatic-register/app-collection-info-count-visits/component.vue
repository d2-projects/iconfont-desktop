<template>
  <span class="d-flex align-center flex-shrink-0">
    <v-icon size="22" color="grey" left>mdi-eye-outline</v-icon>
    <span class="font-weight-medium">{{ value | numberFormat }}</span>
  </span>
</template>

<script>
export default {
  name: 'app-collection-info-count-visits',
  props: {
    value: {
      type: Number,
      default: 0
    }
  }
}
</script>
