import shortid from 'shortid'
import { get } from 'lodash-es'

export default {
  props: {
    // 数据值
    value: {
      type: Array,
      default: () => []
    },
    // 区分项目唯一性的字段
    uniqueKey: {
      type: String,
      default: 'id'
    },
    selected: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    onListItemClick (item, index) {
      this.$emit('click-item', item, index)
    },
    /**
     * @description 传入列表中的一个项目 返回可以用作唯一标记的值
     * @param {Object} item 列表中的一个项目
     */
    generateUniqueKey (item) {
      return get(item, this.uniqueKey, shortid.generate())
    }
  }
}
