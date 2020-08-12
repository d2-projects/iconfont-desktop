<template>
  <span class="d-flex align-center flex-shrink-0">
    <v-icon size="22" color="grey" left>
      mdi-clock-time-three-outline
    </v-icon>
    <span class="font-weight-medium">
      {{ time }}
    </span>
  </span>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'app-collection-info-time',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  computed: {
    time () {
      return this.value ? dayjs(this.value).format('YYYY-MM-DD') : ''
    }
  }
}
</script>
