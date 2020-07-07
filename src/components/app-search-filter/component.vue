<style lang="scss">
@include b(search-filter) {
  height: 100%;
  @include e(scroll) {
    height: 100%;
  }
}
</style>

<template>
  <v-card class="app-search-filter pa-1" color="primary" flat dark>
    <app-scroll class="app-search-filter__scroll">
      <v-expansion-panels flat multiple accordion tile hover>
        <v-expansion-panel>
          <v-expansion-panel-header color="primary">
            <v-icon class="flex-grow-0" left>mdi-star-circle</v-icon>
            <span class="font-weight-bold">分类</span>
          </v-expansion-panel-header>
          <v-expansion-panel-content color="primary">
            <v-radio-group v-model="collection" hide-details>
              <v-radio v-for="option in dict.collection" :key="option.name" :label="option.label" :value="option.name"/>
            </v-radio-group>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header color="primary">
            <v-icon class="flex-grow-0" left>mdi-invert-colors</v-icon>
            <span class="font-weight-bold">填充</span>
          </v-expansion-panel-header>
          <v-expansion-panel-content color="primary">
            <v-radio-group v-model="fills" hide-details>
              <v-radio
                v-for="option in dict.fills"
                :key="option.name"
                :label="option.label"
                :value="option.name"/>
            </v-radio-group>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header color="primary">
            <v-icon class="flex-grow-0" left>mdi-palette</v-icon>
            <span class="font-weight-bold">风格</span>
          </v-expansion-panel-header>
          <v-expansion-panel-content color="primary">
            <v-radio-group v-model="style" hide-details>
              <v-radio
                v-for="option in dict.style"
                :key="option.name"
                :label="option.label"
                :value="option.name"/>
            </v-radio-group>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
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
