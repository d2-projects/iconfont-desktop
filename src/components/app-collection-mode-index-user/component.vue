<template>
  <app-collection-body
    type="list-item-avatar-two-line, image"
    :height="260"
    :loading="loading">
    <app-collection-text class="pb-0">
      <app-collection-info-user-portrait :value="user"/>
    </app-collection-text>
    <app-collection-cover class="pa-2" :value="icons" :id="id" :illustration="illustration"/>
  </app-collection-body>
</template>

<script>
import mixinComponentCollection from '@/mixins/component-collection.js'

export default {
  name: 'app-collection-mode-index-user',
  mixins: [
    mixinComponentCollection
  ]
}
</script>
