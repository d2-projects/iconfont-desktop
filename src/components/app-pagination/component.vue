<style lang="scss">
@include b(pagination) {
  .v-pagination__navigation {
    outline-color: map-get($blue, 'darken-2');
    box-shadow: none;
  }
  .v-pagination__item {
    outline-color: map-get($blue, 'darken-2');
    box-shadow: none;
  }
}
</style>

<template>
  <div class="app-pagination pa-4">
    <v-pagination
      v-model="currentValue.current"
      :length="page"
      :total-visible="6"
      @input="onInput"/>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash-es'

export default {
  name: 'app-pagination',
  props: {
    value: {
      type: Object,
      default: () => ({
        current: 1,
        size: 6,
        total: 0
      })
    }
  },
  data () {
    return {
      currentValue: {
        current: 1,
        size: 6,
        total: 0
      }
    }
  },
  computed: {
    page () {
      return Math.ceil(this.currentValue.total / this.currentValue.size)
    }
  },
  watch: {
    value: {
      handler (value) {
        this.currentValue = cloneDeep(value)
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    onInput () {
      this.$emit('input', this.currentValue)
      this.$emit('change')
    }
  }
}
</script>
