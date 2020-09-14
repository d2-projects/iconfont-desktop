<style lang="scss">
@include b(setting-list) {
  @include e(header) {
    border-bottom: 1px solid map-get($grey, 'lighten-4');
  }
}
</style>

<template>
  <v-sheet class="app-setting-list mb-5" rounded>
    <div
      v-if="title && description"
      class="app-setting-list__header px-5 pt-3">
      <app-setting-list-header
        :title="title"
        :description="description"/>
    </div>
    <div class="px-5 py-3">
      <slot/>
    </div>
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
    },
    title: {
      type: String,
      default: '',
      required: false
    },
    description: {
      type: String,
      default: '',
      required: false
    }
  },
  provide () {
    return {
      appSettingList: this
    }
  }
}
</script>
