<template>
  <v-app>
    <system/>
    <v-main class="grey lighten-4">
      <router-view/>
    </v-main>
    <navigation/>
    <app-sys-loading/>
    <app-assets-details-illustration/>
  </v-app>
</template>

<script>
import navigation from '../components/navigation'
import system from '../components/system'

export default {
  components: {
    navigation,
    system
  }
}
</script>
