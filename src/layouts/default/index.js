import navigation from './components/navigation'
import loading from './components/loading'

export default {
  render (h) {
    return <v-app>
      <v-main>
        <router-view/>
      </v-main>
      <navigation/>
      <loading/>
    </v-app>
  }
}
