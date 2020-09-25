<template>
  <v-dialog v-bind="dialog" @input="onDialogInput">
    <v-card>
      <v-card-title>
        {{ title }}
      </v-card-title>
      <v-divider/>
      <div :style="contentStyle">
        <app-scroll-group>
          <section v-for="(item, index) of items" :key="generateUniqueKey(item)">
            <app-assets-details-illustration
              :value="item"
              :id-key="setting.itemIdKey"/>
            <v-divider v-if="index !== count - 1"/>
          </section>
        </app-scroll-group>
      </div>
      <v-divider/>
      <v-card-actions>
        <v-spacer/>
        <v-btn color="blue darken-1" text @click="close">好</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import bus from '@/bus.js'

import mixinComponentAssetsDetailsDialog from '@/mixins/component-assets-details-dialog.js'

export default {
  name: 'app-assets-details-dialog-illustration',
  mixins: [
    mixinComponentAssetsDetailsDialog
  ],
  created () {
    bus.$on('preview-illustrations', items => {
      this.items = items
      this.open()
    })
  }
}
</script>
