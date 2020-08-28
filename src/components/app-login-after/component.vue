<template>
  <app-login v-if="!isLogged"/>
  <div v-else>
    <slot/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'app-login-after',
  computed: {
    ...mapGetters('sdk', [
      'isLogged'
    ])
  }
}
</script>
