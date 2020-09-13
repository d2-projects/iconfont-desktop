<template>
  <app-setting-list-item :label="label">
    <v-text-field
      v-model="currentValue"
      outlined
      dense
      single-line
      hide-details
      clearable
      @input="emit"/>
  </app-setting-list-item>
</template>

<script>
import mixinSettingListItem from '@/mixins/component-setting-list-item.js'

export default {
  name: 'app-setting-list-item-text',
  mixins: [
    mixinSettingListItem
  ]
}
</script>
