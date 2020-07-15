<template>
  <v-btn color="indigo" text>
    <v-icon size="16" left>mdi-thumb-up</v-icon>
    {{ value | numberFormat }}
  </v-btn>
</template>

<script>
export default {
  name: 'app-collection-action-item-favorite',
  props: {
    value: {
      type: Number,
      default: 0
    }
  }
}
</script>
