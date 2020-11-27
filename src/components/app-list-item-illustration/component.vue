<template>
  <app-list-item-content :selected="selected">
    <v-img
      :aspect-ratio="1"
      :src="https(illustration.file)"
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
  methods: {
    https (url) {
      if (/^https:/.test(url)) return url
      return 'https:' + url
    }
  }
}
</script>
