import { get } from 'lodash-es'
import shortid from 'shortid'

export default {
  data () {
    return {
      dialog: {
        value: false,
        width: 600,
        overlayColor: '#000'
      },
      setting: {
        uniqueKey: 'id',
        itemIdKey: 'id'
      },
      items: []
    }
  },
  computed: {
    /**
     * @description 状态 - 总数量
     */
    count () {
      return this.items.length
    },
    /**
     * @description 状态 - 空
     */
    isEmpty () {
      return this.count === 0
    },
    /**
     * @description 状态 - 只有一项数据
     */
    isSingle () {
      return this.count === 1
    },
    /**
     * @description 状态 - 多项数据
     */
    isMultiple () {
      return this.count > 1
    },
    /**
     * @description 根据资源数量显示不同的标题
     */
    title () {
      const firstTitle = get(this.items, '[0].name', '')
      if (this.isSingle) return `"${firstTitle}" 的详细信息`
      if (this.isMultiple) return `"${firstTitle}" 等 ${this.count} 个项目`
      return firstTitle
    }
  },
  methods: {
    /**
     * @description 传入列表中的一个项目 返回可以用作唯一标记的值
     * @param {Object} item 列表中的一个项目
     */
    generateUniqueKey (item) {
      return get(item, this.setting.uniqueKey, shortid.generate())
    },
    /**
     * @description 打开窗口
     */
    open () {
      this.dialog.value = true
    },
    /**
     * @description 关闭窗口
     */
    close () {
      this.dialog.value = false
    },
    /**
     * @description 处理窗口关闭
     */
    onDialogInput (value) {
      if (!value) {
        this.close()
      }
    }
  }
}
