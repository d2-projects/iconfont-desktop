import { fill, find, without, fromPairs, isFunction } from 'lodash-es'

export default {
  data () {
    return {
      list: {
        // 搜索条件
        query: {
          keyword: ''
        },
        // 分页
        page: {
          current: 1,
          size: 6,
          total: 0
        },
        // 搜索状态
        status: {
          isSearched: false,
          isSearching: false
        },
        // 搜索结果
        data: [],
        // 自动加载
        autoLoad: {
          count: 0,
          max: 5
        },
        // 占位
        placeholder: {
          template: {
            loading: true
          }
        },
        // 设置
        setting: {
          searchWithoutKeywords: false,
          uniqueKey: 'id'
        },
        // 多选
        select: {
          active: false,
          // 这里存的是 uniqueKey
          selectedIds: []
        }
      }
    }
  },
  computed: {
    /**
     * @description 列表数据 - 除去占位
     */
    listMixinDataWithOutPlaceholder () {
      return this.listMixinIsHasPlaceholder
        ? without(this.list.data, this.list.placeholder.template)
        : this.list.data
    },
    /**
     * @description 列表数据 - 转对象
     */
    listMixinDataDict () {
      return fromPairs(this.listMixinDataWithOutPlaceholder.map(item => [
        item[this.list.setting.uniqueKey],
        item
      ]))
    },
    listMixinIsSelectedCount () {
      return this.list.select.selectedIds.length
    },
    /**
     * @description 当前是否已经选中全部
     */
    listMixinIsSelectedAll () {
      return this.listMixinIsSelectedCount === this.list.data.length
    },
    /**
     * @description 当前选中的列表项目 每一项的数据格式和原版一致
     */
    listMixinSelectedData () {
      return this.list.select.selectedIds.map(id => this.listMixinDataDict[id])
    },
    /**
     * @description 返回和当前 list.data 数量一致的关于选中状态的数据
     * @example [true, false, false, true, ...]
     */
    listMixinSelectedStatus () {
      const uniqueKey = this.list.setting.uniqueKey
      const data = Object.assign(
        fromPairs(this.listMixinDataWithOutPlaceholder.map(item => [item[uniqueKey], false])),
        fromPairs(this.list.select.selectedIds.map(id => [id, true]))
      )
      return this.list.data.map(item => !!data[item[uniqueKey]])
    },
    /**
     * @description 当前列表中是否存在占位数据
     */
    listMixinIsHasPlaceholder () {
      return !!find(this.list.data, this.list.placeholder.template)
    },
    /**
     * @description 是否可以继续加载
     */
    listMixinCanLoadMore () {
      return this.list.status.isSearched &&
        this.list.page.total !== 0 &&
        this.list.page.total !== this.list.data.length
    },
    /**
     * @description 是否已经加载完所有的数据
     */
    listMixinIsLoadedAll () {
      return this.list.status.isSearched &&
        this.list.page.total !== 0 &&
        this.list.page.total === this.list.data.length
    },
    /**
     * @description 是否已经搜索过但是没有查找到数据
     */
    listMixinIsNoResult () {
      return this.list.status.isSearched &&
        this.list.page.total === 0
    },
    /**
     * @description 是否在当前可以发生查询动作
     */
    listMixinCanDoLoad () {
      return (this.list.setting.searchWithoutKeywords || this.list.query.keyword) && !this.list.status.isSearching
    },
    /**
     * @description 是否当前可以自动加载
     */
    listMixinCanAutoLoad () {
      return !this.list.status.isSearching &&
        this.listMixinCanLoadMore &&
        this.list.autoLoad.count < this.list.autoLoad.max
    }
  },
  beforeRouteLeave (to, from, next) {
    this.list.data = []
    next()
  },
  methods: {
    listMixinTryToggleItemSelect (item, index) {
      if (this.list.select.active) {
        const id = item[this.list.setting.uniqueKey]
        const index = this.list.select.selectedIds.indexOf(id)
        if (index >= 0) {
          this.list.select.selectedIds.splice(index, 1)
        } else {
          this.list.select.selectedIds.push(id)
        }
        return
      }
      if (isFunction(this.onClickItem)) {
        this.onClickItem(item, index)
      }
    },
    listMixinOnSelectActiveChange (value) {
      if (!value) {
        this.listMixinClearSelect()
      }
      this.list.select.active = value
    },
    listMixinClearSelect () {
      this.list.select.selectedIds = []
    },
    listMixinSelectAll () {
      this.list.select.selectedIds = this.listMixinDataWithOutPlaceholder.map(item => item[this.list.setting.uniqueKey])
    },
    listMixinOnSelectAllChange (value) {
      if (value) {
        this.listMixinSelectAll()
      } else {
        this.listMixinClearSelect()
      }
    },
    listMixinScrollTop () {
      const list = this.$refs.list
      if (!list) return
      const osInstance = list.getOsInstance()
      if (!osInstance) return
      osInstance.scroll(0)
    },
    listMixinOnInCordonY () {
      if (this.listMixinCanAutoLoad) {
        this.list.autoLoad.count += 1
        this.listMixinLoadMore()
      }
    },
    listMixinReset () {
      this.list.data = []
      this.list.page.current = 1
      this.list.page.total = 0
      this.list.status.isSearched = false
      this.list.autoLoad.count = 0
    },
    listMixinLoad () {},
    listMixinReload () {
      this.listMixinReset()
      if (this.listMixinCanDoLoad) {
        this.listMixinLoad()
      }
    },
    listMixinLoadMore () {
      if (this.listMixinCanDoLoad) {
        this.listMixinLoad()
      }
    },
    listMixinAddPlaceholder () {
      this.list.data.push(
        ...fill(
          Array(this.list.page.size),
          this.list.placeholder.template
        )
      )
    },
    listMixinRemovePlaceholder () {
      if (this.listMixinIsHasPlaceholder) {
        this.list.data = this.listMixinDataWithOutPlaceholder
      }
    },
    async listMininFetch (promise) {
      this.list.status.isSearching = true
      const result = await promise
      this.list.status.isSearched = true
      this.list.status.isSearching = false
      return result
    }
  }
}
