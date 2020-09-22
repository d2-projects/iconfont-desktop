<template>
  <v-row no-gutters>
    <v-col
      v-for="(item, index) of value"
      :key="generateUniqueKey(item)"
      xs="4"
      sm="3"
      md="3"
      lg="2"
      xl="2"
      class="pa-1">
      <app-list-item-illustration
        :illustration="item"
        @click.native="onListItemClick(item, index)"/>
    </v-col>
  </v-row>
</template>

<script>
import mixinComponentList from '@/mixins/component-list.js'

export default {
  name: 'app-list-illustration',
  mixins: [
    mixinComponentList
  ]
}
</script>
