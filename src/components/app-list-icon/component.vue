<template>
  <v-row no-gutters>
    <v-col
      v-for="item of value"
      :key="item.id"
      xs="4"
      sm="2"
      md="2"
      lg="1"
      xl="1"
      class="pa-1">
      <app-list-icon-item :icon="item"/>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'app-list-icon',
  props: {
    value: {
      type: Array,
      default: () => []
    }
  }
}
</script>
