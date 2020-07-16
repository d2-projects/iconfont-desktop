<template>
  <div></div>
</template>

<script>
export default {
  beforeRouteEnter (to, from, next) {
    next({
      name: 'setting-account'
    })
  }
}
</script>
