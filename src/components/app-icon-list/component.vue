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
    <v-container>
      <div class="pa-1">
        <slot name="header"/>
      </div>
      <v-row no-gutters>
        <v-col v-for="item in value" :key="item.id" xs="4" sm="3" md="2" lg="2" xl="1" class="pa-1">
          <app-icon-list-item :value="item"/>
        </v-col>
      </v-row>
      <div class="pa-1">
        <slot name="footer"/>
      </div>
    </v-container>
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
      this.$emit('scrollBottom', event)
    }
  }
}
</script>
