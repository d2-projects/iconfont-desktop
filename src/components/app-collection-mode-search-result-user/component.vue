<template>
  <app-collection-body
    type="image, list-item"
    :height="222"
    :loading="loading">
    <app-collection-cover class="pa-2 pb-0" :value="icons" :id="id" :illustration="illustration"/>
    <app-collection-text justify>
      <app-collection-info-name :value="name" class="mr-2"/>
      <app-collection-info-count-icons :value="countIcons"/>
    </app-collection-text>
  </app-collection-body>
</template>

<script>
import mixinComponentCollection from '@/mixins/component-collection.js'

export default {
  name: 'app-collection-mode-search-result-user',
  mixins: [
    mixinComponentCollection
  ]
}
</script>
