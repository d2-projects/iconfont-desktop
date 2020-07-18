<style lang="scss">
@include b(upload) {
  border: 1px solid map-get($grey, 'lighten-3');
}
</style>

<template>
  <div class="app-upload is-rounded" @click="onClick">
    <div v-if="value" class="pa-2">
      <slot v-bind:src="value">
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
  computed: {
    ...mapState('sdk', [
      'sdk'
    ])
  },
  methods: {
    onClick () {
      this.$refs.input.click()
    },
    async fileSelected (event) {
      if (event.target.files.length === 0) return
      const file = event.target.files[0]
      const result = await this.sdk.upload({
        filePath: file.path
      })
      this.$emit('input', result.url)
    }
  }
}
</script>
