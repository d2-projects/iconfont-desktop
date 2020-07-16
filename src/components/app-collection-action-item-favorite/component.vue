<template>
  <v-btn color="red" text>
    <v-icon size="16" left>mdi-heart</v-icon>
    {{ value | numberFormat }}
  </v-btn>
</template>

<script>
export default {
  name: 'app-collection-action-item-likes',
  props: {
    value: {
      type: Number,
      default: 0
    }
  }
}
</script>
