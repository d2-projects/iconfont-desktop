<style lang="scss">
@include b(search-bar) {
  @include e(content) {
    max-width: 400px;
  }
}
</style>

<template>
  <div class="app-search-bar pa-4">
    <div class="app-search-bar__content d-flex mx-auto">
      <v-text-field
        ref="input"
        class="mr-5"
        v-model="currentValue"
        :label="placeholder"
        filled
        rounded
        single-line
        autofocus
        hide-details
        background-color="rgba(240, 240, 240, 0.8)"
        @input="onInput"
        @keydown="onKeyDown"
        @click="onClickInput"/>
      <v-btn
        :loading="loading"
        :disabled="false"
        :elevation="2"
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
    },
    loading: {
      type: Boolean
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      currentValue: '',
      throttled: null
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
    this.throttled = throttle(this.onInput, 1000)
  },
  methods: {
    onInput () {
      this.$emit('input', this.currentValue)
      this.$emit('change', this.currentValue)
    },
    onKeyDown (event) {
      if (event.keyCode === 13) {
        this.onClickSearch()
      }
    },
    onClickInput () {
      if (this.currentValue) {
        this.currentValue = ''
        this.onInput()
        this.onClickSearch()
      }
    },
    onClickSearch () {
      this.$emit('submit', this.currentValue)
    }
  }
}
</script>
