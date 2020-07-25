<style lang="scss">
@include b(page-user-detail) {
  @extend .absolute-parent;
  @include e(topbar) {
    z-index: 1;
    @extend .absolute-top;
    @extend .backdrop;
  }
  @include e(content) {
    @extend .absolute-all;
  }
}
</style>

<template>
  <div class="app-page-user-detail">
    <div class="app-page-user-detail__content">
      list
    </div>
    <div ref="topbar" class="app-page-user-detail__topbar">
      topbar
    </div>
  </div>
</template>
