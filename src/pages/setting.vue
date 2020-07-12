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
    <v-sheet class="pa-4">
      <p>{{ collection }}</p>
      <app-dict-select-chip v-model="collection" name="collection"/>
      <p>{{ fills }}</p>
      <app-dict-select-chip v-model="fills" name="fills"/>
      <p>{{ style }}</p>
      <app-dict-select-chip v-model="style" name="style"/>
      <p>{{ collectionType }}</p>
      <app-dict-select-chip v-model="collectionType" name="collectionType"/>
      <p>{{ collectionSort }}</p>
      <app-dict-select-chip v-model="collectionSort" name="collectionSort"/>
    </v-sheet>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      collection: -1,
      fills: '',
      style: '',
      collectionType: 3,
      collectionSort: 'time'
    }
  },
  methods: {
    ...mapActions('sdk', [
      'login',
      'logout'
    ])
  }
}
</script>
