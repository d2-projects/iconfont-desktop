<template>
  <v-btn color="indigo" @click="onClick" text>
    <v-icon size="16" left>{{ icon }}</v-icon>
    {{ currentValue | numberFormat }}
  </v-btn>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'app-collection-action-item-likes',
  props: {
    value: {
      type: Number,
      default: 0
    },
    id: {
      type: Number,
      default: 0
    }
  },
  data () {
    const data = {}
    data.currentValue = this.value
    data.related = false
    return data
  },
  computed: {
    ...mapState('sdk', [
      'sdk'
    ]),
    icon () {
      return `mdi-thumb-up${this.related ? '' : '-outline'}`
    }
  },
  watch: {
    value (value) {
      this.currentValue = value
    }
  },
  methods: {
    async onClick () {
      const result = await this.sdk.collectionLike({ id: this.id })
      if (result) {
        this.currentValue = result.count
        this.related = true
      }
    }
  }
}
</script>
