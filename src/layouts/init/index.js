import system from '../components/system'

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
