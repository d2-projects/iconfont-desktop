<template>
  <app-setting-list-item :label="label">
    <v-text-field
      v-model="currentValue"
      outlined
      dense
      single-line
      hide-details
      clearable
      @input="onInput"/>
  </app-setting-list-item>
</template>

<script>
export default {
  name: 'app-setting-list-item-text',
  props: {
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    }
  },
  data () {
    const data = {}
    data.currentValue = this.value
    return data
  },
  watch: {
    value (value) {
      this.currentValue = value
    }
  },
  methods: {
    onInput (value) {
      this.$emit('input', value)
      this.$emit('change', value)
    }
  }
}
</script>
