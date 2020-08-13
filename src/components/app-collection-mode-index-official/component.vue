<template>
  <app-collection-body
    type="card-heading, image"
    :height="220"
    :loading="loading">
    <app-collection-text class="text-subtitle-1 text-center pb-0">
      {{ name }}
    </app-collection-text>
    <app-collection-cover class="pa-2" :value="icons" :id="id" :illustration="illustration"/>
  </app-collection-body>
</template>

<script>
import mixinComponentCollection from '@/mixins/component-collection.js'

export default {
  name: 'app-collection-mode-index-official',
  mixins: [
    mixinComponentCollection
  ]
}
</script>
