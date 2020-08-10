<template>
  <div>
    user-detail
  </div>
</template>

<script>
export default {
  beforeRouteEnter (to, from, next) {
    next({
      name: 'user-detail-collections',
      query: to.query
    })
  }
}
</script>
