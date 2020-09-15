<style lang="scss">
@include b(setting-list-item-select-folder) {
  width: 100%;
}
</style>

<template>
  <app-setting-list-item :label="label">
    <div class="app-setting-list-item-select-folder" flex>
      <v-text-field
        v-model="currentValue"
        class="mr-2"
        outlined
        dense
        single-line
        hide-details
        @input="emit"/>
      <v-btn
        height="40"
        color="primary"
        outlined
        @click="onClickSelectButton">
        选择目录
      </v-btn>
    </div>
  </app-setting-list-item>
</template>

<script>
import { ipcRenderer } from 'electron'
import mixinSettingListItem from '@/mixins/component-setting-list-item.js'

export default {
  name: 'app-setting-list-item-select-folder',
  mixins: [
    mixinSettingListItem
  ],
  methods: {
    async onClickSelectButton () {
      const value = await ipcRenderer.invoke('selectFolder')
      if (value) {
        this.currentValue = value
        this.emit(value)
      }
    }
  }
}
</script>
