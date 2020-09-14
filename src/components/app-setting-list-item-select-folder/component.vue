<template>
  <app-setting-list-item :label="label">
    <div flex>
      <v-text-field
        v-model="currentValue"
        class="mr-2"
        outlined
        dense
        single-line
        hide-details
        @input="onTextFieldInput"/>
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
import { throttle } from 'lodash-es'
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
