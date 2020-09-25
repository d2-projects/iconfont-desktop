import { get } from 'lodash-es'

export default {
  data () {
    return {
      dialog: {
        value: false,
        width: 600,
        overlayColor: '#000'
      },
      setting: {
        typeName: '插画',
        itemWidth: 500,
        itemHeight: 300,
        multipleItemShow: 1.5
      },
      items: []
    }
  },
  computed: {
    /**
     * @description 状态 - 空
     */
    isEmpty () {
      return this.items.length === 0
    },
    /**
     * @description 状态 - 只有一项数据
     */
    isSingle () {
      return this.items.length === 1
    },
    /**
     * @description 状态 - 多项数据
     */
    isMultiple () {
      return this.items.length > 1
    },
    /**
     * @description 主体区域样式
     */
    contentStyle () {
      const itemHeight = this.setting.itemHeight
      const height = itemHeight * (this.isMultiple ? this.setting.multipleItemShow : 1)
      return {
        height: height + 'px'
      }
    },
    /**
     * @description 根据资源数量显示不同的标题
     */
    title () {
      const firstTitle = get(this.items, '[0].name', '')
      const count = this.items.length
      if (this.isSingle) return `${this.setting.typeName} "${firstTitle}" 的详细信息`
      if (this.isMultiple) return `"${firstTitle}" 等 ${count} 个${this.setting.typeName}`
      return firstTitle
    }
  },
  methods: {
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
