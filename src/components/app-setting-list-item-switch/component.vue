<style lang="scss">
@include b(setting-list-item-switch) {
  .v-input--selection-controls {
    margin-top: 0px;
    padding-top: 0px;
  }
}
</style>

<template>
  <app-setting-list-item :label="label" class="app-setting-list-item-switch">
    <v-switch v-model="currentValue" inset hide-details></v-switch>
  </app-setting-list-item>
</template>

<script>
import { throttle } from 'lodash-es'
import { ipcRenderer } from 'electron'
import mixinSettingListItem from '@/mixins/component-setting-list-item.js'

export default {
  name: 'app-setting-list-item-switch',
  mixins: [
    mixinSettingListItem
  ],
  methods: {
    async onClickSelectButton () {
      const value = await ipcRenderer.invoke('selectFolder')
      if (value) {
        await this.emit(value)
        this.currentValue = value
      }
    },
    onTextFieldInput: throttle(function (value) {
      this.emit(value)
    }, 1000)
  }
}
</script>
