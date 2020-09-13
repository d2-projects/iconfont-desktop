<style lang="scss">
@include b(markdown-render) {
  h1, h2 {
    border-bottom: none;
  }
}
</style>

<template>
  <div class="app-markdown-render markdown-body" v-html="html"/>
</template>

<script>
import { mapActions } from 'vuex'
import { get } from 'lodash-es'
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
    ...mapActions('ipc', [
      'openExternal'
    ]),
    refersh (source) {
      this.html = marked(source)
      this.initLinkClick()
    },
    initLinkClick () {
      this.$nextTick(() => {
        this.$el.getElementsByTagName('a').forEach(a => {
          a.onclick = e => {
            const href = get(e, 'target.href', '')
            if (href) this.openExternal(href)
            return false
          }
        })
      })
    }
  }
}
</script>
