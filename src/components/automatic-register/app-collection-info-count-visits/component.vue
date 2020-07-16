<template>
  <v-tooltip top open-delay="500">
    <template v-slot:activator="{ on, attrs }">
      <span class="d-flex align-center flex-shrink-0" v-on="on" v-bind="attrs">
        <v-icon size="22" color="grey" left>mdi-eye-outline</v-icon>
        <span class="font-weight-medium">{{ value | numberFormat }}</span>
      </span>
    </template>
    <span>{{ tooltipText }}</span>
  </v-tooltip>
</template>

<script>
export default {
  name: 'app-collection-info-count-visits',
  props: {
    value: {
      type: Number,
      default: 0
    }
  },
  computed: {
    tooltipText () {
      return this.value < 1000 ? '访问人数' : `${this.value} 人看过`
    }
  }
}
</script>
