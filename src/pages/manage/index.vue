<template>
  <div></div>
</template>

<script>
export default {
  beforeRouteEnter (to, from, next) {
    next({
      name: 'manage-me-resources-uploads'
    })
  }
}
</script>
