<style lang="scss">
@include b(search-filter) {
  height: 100%;
  @include e(scroll) {
    height: 100%;
  }
}
</style>

<template>
  <v-card class="app-search-filter" color="primary" dark flat>
    <app-scroll class="app-search-filter__scroll">
      <v-card-title>
        <v-icon left>mdi-star-circle</v-icon>
        <span class="font-weight-light">分类</span>
      </v-card-title>
      <v-card-text>
        <v-radio-group v-model="collection">
          <v-radio
            v-for="option in dict.collection"
            :key="option.name"
            :label="option.label"
            :value="option.name"/>
        </v-radio-group>
      </v-card-text>
      <v-card-title>
        <v-icon left>mdi-invert-colors</v-icon>
        <span class="font-weight-light">填充</span>
      </v-card-title>
      <v-card-text>
        <v-radio-group v-model="fills">
          <v-radio
            v-for="option in dict.fills"
            :key="option.name"
            :label="option.label"
            :value="option.name"/>
        </v-radio-group>
      </v-card-text>
      <v-card-title>
        <v-icon left>mdi-palette</v-icon>
        <span class="font-weight-light">风格</span>
      </v-card-title>
      <v-card-text>
        <v-radio-group v-model="style">
          <v-radio
            v-for="option in dict.style"
            :key="option.name"
            :label="option.label"
            :value="option.name"/>
        </v-radio-group>
      </v-card-text>
    </app-scroll>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'app-search-filter',
  data () {
    return {
      collection: 'all',
      fills: 'all',
      style: 'all'
    }
  },
  computed: {
    ...mapState('sdk', [
      'dict'
    ])
  }
}
</script>
