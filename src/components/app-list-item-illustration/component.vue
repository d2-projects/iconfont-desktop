<template>
  <app-list-item-content>
    <v-img
      :aspect-ratio="1"
      :src="illustration.file"
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
    }
  }
}
</script>
