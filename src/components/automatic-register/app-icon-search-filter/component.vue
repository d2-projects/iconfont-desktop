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
              @change="onRadioGroupChange">
              <v-radio
                v-for="option in options[index].options"
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
    value: {
      type: Object,
      default: () => ({
        collection: '',
        fills: '',
        style: ''
      })
    }
  },
  data () {
    return {
      opened: [0, 1, 2],
      currentValue: ['', '', '']
    }
  },
  watch: {
    value: {
      handler (value) {
        const data = this.valueToName(value)
        this.currentValue = [
          data.collection,
          data.fills,
          data.style
        ]
      },
      immediate: true
    }
  },
  computed: {
    ...mapState('sdk', ['dictionary']),
    options () {
      return [
        { title: '分类', icon: 'mdi-star-circle', options: this.dictionary.collection },
        { title: '填充', icon: 'mdi-invert-colors', options: this.dictionary.fills },
        { title: '风格', icon: 'mdi-palette', options: this.dictionary.style }
      ]
    }
  },
  methods: {
    findInDictionaryBy (value, dictionaryName, byKeyname, returnKeyname) {
      const item = this.dictionary[dictionaryName].find(dictionaryItem => dictionaryItem[byKeyname] === value)
      return item ? item[returnKeyname] : value
    },
    nameToValue (source) {
      return fromPairs(Object.keys(source).map(keyname => [
        keyname,
        this.findInDictionaryBy(source[keyname], keyname, 'name', 'value')
      ]))
    },
    valueToName (source) {
      return fromPairs(Object.keys(source).map(keyname => [
        keyname,
        this.findInDictionaryBy(source[keyname], keyname, 'value', 'name')
      ]))
    },
    onRadioGroupChange () {
      const value = this.nameToValue({
        collection: this.currentValue[0],
        fills: this.currentValue[1],
        style: this.currentValue[2]
      })
      this.$emit('input', value)
      this.$emit('change', value)
    }
  }
}
</script>
