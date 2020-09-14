import { get } from 'lodash-es'

export default {
  props: {
    // v-model
    value: {
      type: String,
      default: ''
    },
    // 显示文字
    label: {
      type: String,
      default: ''
    },
    // 和 store 的绑定
    store: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      currentValue: ''
    }
  },
  computed: {
    // 这个组件是否和 store 存在绑定
    isBindStore () {
      return !!this.store && /.+:.+/.test(this.store)
    },
    // 绑定的 store 模块名
    bindStoreModule () {
      return get(this.store.split(':'), '[0]', '')
    },
    // 绑定的 store 模块 get action 参数
    bindStoreKey () {
      const names = this.store.split(':')
      names.shift()
      return names.join(':')
    }
  },
  async created () {
    if (this.isBindStore) {
      const value = await this.$store.dispatch(`${this.bindStoreModule}/get`, this.bindStoreKey)
      this.currentValue = value
    } else {
      this.currentValue = this.value
    }
  },
  watch: {
    value (value) {
      this.currentValue = value
    }
  },
  methods: {
    async emit (value) {
      if (this.isBindStore) {
        await this.$store.dispatch(`${this.bindStoreModule}/set`, {
          name: this.bindStoreKey,
          value: value
        })
      } else {
        this.$emit('input', value)
        this.$emit('change', value)
      }
    }
  }
}
