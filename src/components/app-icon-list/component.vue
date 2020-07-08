<style lang="scss">
@include b(icon-list) {
  height: 100%;
}
</style>

<template>
  <app-scroll
    class="app-icon-list"
    :options="{
      scrollbars: {
        autoHide: 'scroll',
        autoHideDelay: 300
      }
    }"
    @scrollBottom="onScrollBottom">
    <slot name="header"/>
    <v-row no-gutters class="pa-1">
      <v-col v-for="item in value" :key="item.id" xs="6" sm="4" md="2" lg="2" xl="1" class="pa-1">
        <app-icon-list-item :value="item"/>
      </v-col>
    </v-row>
    <slot name="footer"/>
  </app-scroll>
</template>

<script>
export default {
  name: 'app-icon-list',
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    onScrollBottom (event) {
      console.log('onScrollBottom')
    }
  }
}
</script>
