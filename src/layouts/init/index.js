import system from '@/components/layout/system.vue'

export default {
  render (h) {
    return <v-app>
      <system/>
      <v-main>
        <router-view/>
      </v-main>
    </v-app>
  }
}
