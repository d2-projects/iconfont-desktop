<style lang="scss">
@include b(markdown-render) {}
</style>

<template>
  <div class="app-markdown-render markdown-body" v-html="html"></div>
</template>

<script>
import marked from 'marked'
import 'github-markdown-css'
export default {
  name: 'app-markdown-render',
  props: {
    value: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      html: ''
    }
  },
  created () {
    this.refersh(this.value)
  },
  watch: {
    value (value) {
      this.refersh(value)
    }
  },
  methods: {
    refersh (source) {
      this.html = marked(source)
    }
  }
}
</script>
