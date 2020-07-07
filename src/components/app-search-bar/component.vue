<style lang="scss">
@include b(search-bar) {
  @include e(input-group) {
    max-width: 400px;
  }
}
</style>

<template>
  <div class="app-search-bar pa-2">
    <div class="app-search-bar__input-group d-flex mx-auto">
      <v-text-field
        class="mr-5"
        v-model="currentValue"
        label="搜索"
        filled
        clearable
        rounded
        single-line
        autofocus
        hide-details
        @input="tryEmit"/>
      <v-btn
        :loading="false"
        :disabled="false"
        color="primary"
        class="white--text"
        fab
        @click="onClickSearch">
        <v-icon dark>mdi-magnify</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { throttle } from 'lodash-es'

export default {
  name: 'app-search-bar',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      currentValue: '',
      tryEmit: null
    }
  },
  watch: {
    value: {
      handler (value) {
        this.currentValue = value
      },
      immediate: true
    }
  },
  created () {
    this.tryEmit = throttle(this.doEmit, 1000)
  },
  methods: {
    doEmit () {
      this.$emit('input', this.currentValue)
      this.$emit('change', this.currentValue)
    },
    onClickSearch () {
      this.$emit('submit', this.currentValue)
    }
  }
}
</script>
