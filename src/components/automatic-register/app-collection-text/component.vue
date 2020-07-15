<template>
  <v-card-text :class="classNames">
    <slot/>
  </v-card-text>
</template>

<script>
export default {
  name: 'app-collection-text',
  props: {
    justify: {
      type: Boolean
    }
  },
  computed: {
    classNames () {
      return [
        ...this.justify ? [
          'd-flex',
          'justify-space-between'
        ] : []
      ]
    }
  }
}
</script>
