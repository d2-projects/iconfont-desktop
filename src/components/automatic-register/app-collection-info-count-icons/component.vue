<template>
  <span class="d-flex align-center flex-shrink-0">
    <span class="mr-1">icons</span>
    <span class="red--text font-weight-medium">
      {{ value | numberFormat }}
    </span>
  </span>
</template>

<script>
export default {
  name: 'app-collection-info-count-icons',
  props: {
    value: {
      type: Number,
      default: 0
    }
  }
}
</script>
