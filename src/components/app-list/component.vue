<style lang="scss">
@include b(list) {
  height: 100%;
}
</style>

<template>
  <app-scrollbar
    ref="scrollbar"
    class="app-list"
    :options="{
      scrollbars: {
        autoHide: 'scroll',
        autoHideDelay: 300
      }
    }"
    :cordon-y="800"
    @in-cordon-y="event => $emit('in-cordon-y', event)">
    <v-container class="pa-0">
      <div>
        <slot name="header"/>
      </div>
      <slot/>
      <div>
        <slot name="footer"/>
      </div>
    </v-container>
  </app-scrollbar>
</template>

<script>
export default {
  name: 'app-list',
  methods: {
    getOsInstance () {
      const scroll = this.$refs.scrollbar
      return scroll ? scroll.getOsInstance() : {}
    }
  }
}
</script>
