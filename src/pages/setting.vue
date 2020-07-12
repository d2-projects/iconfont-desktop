<route>
{
  "meta": {
    "sdk": true
  }
}
</route>

<template>
  <div class="pa-5">
    <v-btn @click="login">login</v-btn>
    <v-btn @click="logout">logout</v-btn>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('sdk', [
      'login',
      'logout'
    ])
  }
}
</script>
