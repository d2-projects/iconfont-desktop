<template>
  <v-responsive class="absolute-parent" :aspect-ratio="2/1">
    <planet class="absolute-all"/>
    <div class="absolute-all"></div>
  </v-responsive>
</template>

<script>
import planet from './planet'

export default {
  name: 'component-name',
  components: {
    planet
  }
}
</script>
