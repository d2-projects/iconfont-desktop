<style lang="scss">
@include b(list) {
  height: 100%;
}
</style>

<template>
  <app-scroll
    class="app-list"
    :options="{
      scrollbars: {
        autoHide: 'scroll',
        autoHideDelay: 300
      }
    }"
    :cordon-y="800"
    @inCordonY="event => $emit('inCordonY', event)">
    <v-container class="py-0">
      <div>
        <slot name="header"/>
      </div>
      <slot/>
      <div>
        <slot name="footer"/>
      </div>
    </v-container>
  </app-scroll>
</template>

<script>
export default {
  name: 'app-list'
}
</script>
