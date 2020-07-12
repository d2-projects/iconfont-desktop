<style lang="scss">
@include b(icon-search-filter) {
  height: 100%;
  @include e(scroll) {
    height: 100%;
  }
}
</style>

<template>
  <v-card class="app-icon-search-filter pa-1" color="primary" flat dark>
    <app-scroll
      class="app-icon-search-filter__scroll"
      :options="{
        scrollbars: {
          autoHide: 'never'
        }
      }"
      theme="thin-light">
      <v-expansion-panels :value="opened" flat multiple accordion tile hover>
        <v-expansion-panel
          v-for="(value, index) of currentValue"
          :key="index">
          <v-expansion-panel-header color="primary">
            <v-icon class="flex-grow-0" left>{{ options[index].icon }}</v-icon>
            <span class="font-weight-bold">{{ options[index].title }}</span>
          </v-expansion-panel-header>
          <v-expansion-panel-content color="primary">
            <v-radio-group
              v-model="currentValue[index]"
              hide-details
              @change="onRadioGroupChange(options[index].dictionaryName, index, options[index].propName)">
              <v-radio
                v-for="option in dictionary[options[index].dictionaryName]"
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
import { fromPairs } from 'lodash-es'
import { mapState } from 'vuex'

export default {
  name: 'app-icon-search-filter',
  props: {
    collection: {
      type: [String, Number],
      default: -1
    },
    fills: {
      type: [String, Number],
      default: ''
    },
    sty: {
      type: [String, Number],
      default: ''
    }
  },
  data () {
    return {
      opened: [0, 1, 2],
      currentValue: [-1, '', '']
    }
  },
  watch: {
    collection: {
      handler (value) {
        this.currentValue[0] = this.findInDictionaryBy(value, 'collection', 'value', 'name')
      },
      immediate: true
    },
    fills: {
      handler (value) {
        this.currentValue[1] = this.findInDictionaryBy(value, 'fills', 'value', 'name')
      },
      immediate: true
    },
    sty: {
      handler (value) {
        this.currentValue[2] = this.findInDictionaryBy(value, 'style', 'value', 'name')
      },
      immediate: true
    }
  },
  computed: {
    ...mapState('sdk', [
      'dictionary'
    ]),
    options () {
      return [
        {
          title: '分类',
          icon: 'mdi-star-circle',
          dictionaryName: 'collection',
          propName: 'collection'
        },
        {
          title: '填充',
          icon: 'mdi-invert-colors',
          dictionaryName: 'fills',
          propName: 'fills'
        },
        {
          title: '风格',
          icon: 'mdi-palette',
          dictionaryName: 'style',
          propName: 'sty'
        }
      ]
    }
  },
  methods: {
    findInDictionaryBy (value, dictionaryName, byKeyname, returnKeyname) {
      const item = this.dictionary[dictionaryName].find(dictionaryItem => dictionaryItem[byKeyname] === value)
      return item ? item[returnKeyname] : value
    },
    onRadioGroupChange (dictionaryName, index, propName) {
      const value = this.findInDictionaryBy(this.currentValue[index], dictionaryName, 'name', 'value')
      this.$emit(`update:${propName}`, value)
      this.$emit('change')
    }
  }
}
</script>
