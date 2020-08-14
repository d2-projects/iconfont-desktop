<template>
  <v-row no-gutters>
    <v-col
      v-for="item of value"
      :key="item.id"
      xs="4"
      sm="3"
      md="3"
      lg="2"
      xl="2"
      class="pa-1">
      <slot :illustration="item"/>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'app-illustration-list',
  props: {
    value: {
      type: Array,
      default: () => []
    }
  }
}
</script>
