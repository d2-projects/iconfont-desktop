export default {
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
    emit (value) {
      this.$emit('input', value)
      this.$emit('change', value)
    }
  }
}
