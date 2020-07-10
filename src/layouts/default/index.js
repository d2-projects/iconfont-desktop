import navigation from '@/components/layout/navigation.vue'
import system from '@/components/layout/system.vue'

export default {
  render (h) {
    return <v-app>
      <system/>
      <v-main class="grey lighten-4">
        <router-view/>
      </v-main>
      <navigation/>
    </v-app>
  }
}
