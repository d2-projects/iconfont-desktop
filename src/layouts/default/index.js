import navigation from './components/navigation'
export default {
  render (h) {
    return <v-app>
      <v-main>
        <router-view/>
      </v-main>
      <navigation/>
    </v-app>
  }
}
