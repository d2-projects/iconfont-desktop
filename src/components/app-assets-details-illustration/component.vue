<template>
  <v-dialog
    :value="active"
    width="600"
    overlay-color="#000"
    persistent>
    <v-card>
      <v-card-title>Select Country</v-card-title>
      <v-divider/>
      <div style="height: 500px;">
        <app-scroll-group>
          items
        </app-scroll-group>
      </div>
      <v-divider/>
      <v-card-actions>
        <v-btn color="blue darken-1" text @click="close">Close</v-btn>
        <v-btn color="blue darken-1" text @click="close">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import bus from '@/bus.js'

export default {
  name: 'app-assets-details-illustration',
  data () {
    return {
      active: false
    }
  },
  created () {
    bus.$on('preview-illustrations', items => {
      console.log(items)
      this.open()
    })
  },
  methods: {
    open () {
      this.active = true
    },
    close () {
      this.active = false
    }
  }
}
</script>
