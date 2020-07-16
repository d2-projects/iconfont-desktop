import navigation from '../components/navigation'
import system from '../components/system'

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
