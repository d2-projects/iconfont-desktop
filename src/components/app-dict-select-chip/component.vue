<template>
  <div class="app-dict-select-chip" flex="cross:center">
    <div
      flex-box="0"
      :style="{ width: labelWidth + 'px' }"
      class="font-weight-medium">
      {{ label }}
    </div>
    <div flex-box="1">
      <v-chip-group
        v-model="currentvalue"
        mandatory
        active-class="primary--text"
        @change="onChange">
        <v-chip
          v-for="option of options"
          :key="option.name"
          :value="option.name"
          filter
          outlined>
          {{ option.label }}
        </v-chip>
      </v-chip-group>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'app-dict-select-chip',
  props: {
    value: {
      type: [Number, String],
      default: ''
    },
    name: {
      type: String,
      default: '',
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    labelWidth: {
      type: Number,
      default: 80
    }
  },
  data () {
    return {
      currentvalue: ''
    }
  },
  watch: {
    value: {
      handler (value) {
        this.currentvalue = this.findDictionary(value, 'value', 'name')
      },
      immediate: true
    }
  },
  computed: {
    ...mapState('sdk', [
      'dictionary'
    ]),
    options () {
      return this.dictionary[this.name] || []
    }
  },
  methods: {
    findDictionary (value, keynameBy, keynameGet, defaultValue = '') {
      const item = this.options.find(e => e[keynameBy] === value)
      return item ? item[keynameGet] : defaultValue
    },
    onChange () {
      const value = this.findDictionary(this.currentvalue, 'name', 'value')
      this.$emit('input', value)
      this.$emit('change', value)
    }
  }
}
</script>
