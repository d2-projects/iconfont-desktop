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
    // 是否处于选择模式
    selectActive: {
      type: Boolean
    }
  },
  methods: {
    onListItemClick (item, index) {
      if (this.selectActive) {
        // 处于选择模式时 选中或者取消选中这个项目
      } else {
        // 处于非选择模式时 对外发出点击了一个项目
        // 外层将这个事件视为某一个项目的点击
        this.$emit('click-item', item, index)
      }
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