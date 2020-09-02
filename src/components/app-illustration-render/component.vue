<template>
  <v-img :src="path" v-bind="$attrs"/>
</template>

<script>
export default {
  name: 'app-illustration-render',
  props: {
    type: {
      type: String,
      default: '',
      required: true
    },
    name: {
      type: String,
      default: '',
      required: true
    }
  },
  computed: {
    path () {
      return `${process.env.BASE_URL}illustrations/${this.type}/${this.name}.png`
    }
  }
}
</script>
