<template>
  <app-list-item-content :selected="selected">
    <v-img
      :aspect-ratio="1"
      :src="src"
      class="ma-6"
      contain/>
  </app-list-item-content>
</template>

<script>
export default {
  name: 'app-list-item-illustration',
  props: {
    illustration: {
      type: Object,
      default: () => {}
    },
    selected: {
      type: Boolean
    }
  },
  computed: {
    src () {
      const url = this.illustration.file
      if (/^https:/.test(url)) return url
      return 'https:' + url
    }
  }
}
</script>
