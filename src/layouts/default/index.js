import navigation from './components/navigation'
import loading from './components/loading'
import system from './components/system'

export default {
  render (h) {
    return <v-app>
      <system/>
      <v-main>
        <router-view/>
      </v-main>
      <navigation/>
      <loading/>
    </v-app>
  }
}
