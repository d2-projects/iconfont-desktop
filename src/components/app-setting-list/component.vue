<template>
  <v-sheet class="app-setting-list pa-5 mb-5" rounded>
    <slot/>
  </v-sheet>
</template>

<script>
import { oneOf } from '@/utils/tools.js'

export default {
  name: 'app-setting-list',
  props: {
    labelPosition: {
      type: String,
      default: 'top',
      validator: value => oneOf(value, ['top', 'left'])
    },
    labelWidth: {
      type: Number,
      default: 90
    },
    labelAlign: {
      type: String,
      default: 'left',
      validator: value => oneOf(value, ['left', 'center', 'right'])
    }
  },
  provide () {
    return {
      appSettingList: this
    }
  }
}
</script>
