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
    <v-switch
      v-bind="$attrs"
      v-model="currentValue"
      inset
      hide-details
      @change="emit"/>
  </app-setting-list-item>
</template>

<script>
import mixinSettingListItem from '@/mixins/component-setting-list-item.js'

export default {
  name: 'app-setting-list-item-switch',
  mixins: [
    mixinSettingListItem
  ]
}
</script>
