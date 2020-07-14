<template>
  <v-row class="app-collection-list">
    <v-col v-for="(collection, collectionIndex) of value" :key="collectionIndex" xs="6" sm="6" md="4" lg="4" xl="2">
      <app-collection v-bind="collection"/>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'app-collection-list',
  props: {
    value: {
      type: Array,
      default: () => []
    }
  }
}
</script>
