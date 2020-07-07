<style lang="scss">
$sidebarWidth: 240px;
@include b(page) {
  min-height: 100%;
  position: relative;
  @include e(side) {
    position: absolute;
    width: $sidebarWidth;
    top: 0px;
    bottom: 0px;
    left: 0px;
  }
  @include e(main) {
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: $sidebarWidth;
    right: 0px;
  }
}
</style>

<template>
  <div class="app-page">
    <!-- left -->
    <div class="app-page__side py-2 pl-2">
      <app-search-filter v-model="filter"/>
    </div>
    <!-- right -->
    <div class="app-page__main">
      <app-search-bar/>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      filter: {
        collection: 'all',
        fills: 'all',
        style: 'all'
      }
    }
  }
}
</script>
