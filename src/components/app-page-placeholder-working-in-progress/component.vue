<style lang="scss">
@include b(page-placeholder-working-in-progress) {}
</style>

<template>
  <div class="app-page-placeholder-working-in-progress">
    <app-illustration-render
      type="ginger-cat"
      name="working"
      height="300"
      width="300"
      class="mx-auto"/>
    <div class="text-subtitle-1 text-center font-weight-medium  grey--text text--darken-3">
      正在施工 稍后开放
    </div>
    <div class="text-caption text-center grey--text">
      This feature is under development, please wait patiently
    </div>
  </div>
</template>

<script>
export default {
  name: 'app-page-placeholder-working-in-progress'
}
</script>
