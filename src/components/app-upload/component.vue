<style lang="scss">
@include b(upload) {
  border: 1px solid map-get($grey, 'lighten-3');
  &:hover {
    background-color: map-get($grey, 'lighten-5');
  }
}
</style>

<template>
  <div class="app-upload is-rounded is-pointer" @click="onClick">
    <div v-if="value" class="pa-2">
      <slot :src="value">
        <v-img
          class="is-rounded"
          :src="value"
          max-width="200"
          max-height="200"
          contain/>
      </slot>
    </div>
    <div v-else class="text-subtitle-1 is-pointer px-2 py-1">
      点击上传图片
    </div>
    <div v-if="loading" class="pa-2 pt-0">
      <v-progress-linear indeterminate rounded/>
    </div>
    <input
      ref="input"
      type="file"
      @change="fileSelected"
      style="display:none;">
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'app-upload',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {
    ...mapState('sdk', [
      'sdk'
    ])
  },
  methods: {
    onClick () {
      if (this.loading) return
      this.$refs.input.click()
    },
    async fileSelected (event) {
      if (event.target.files.length === 0) return
      this.loading = true
      try {
        const file = event.target.files[0]
        const result = await this.sdk.upload({ filePath: file.path })
        this.$emit('input', result.url)
      } catch (error) {}
      this.loading = false
    }
  }
}
</script>
