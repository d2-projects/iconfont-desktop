<template>
  <app-square class="white rounded" center>
    <v-img
      :aspect-ratio="1"
      :src="illustration.file"
      class="ma-6"
      contain/>
  </app-square>
</template>

<script>
export default {
  name: 'app-list-illustration-item',
  props: {
    illustration: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
