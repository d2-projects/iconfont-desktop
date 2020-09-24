import { fill, find, without } from 'lodash-es'

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
          searchWithoutKeywords: false
        },
        // 多选
        select: {
          active: false
        }
      }
    }
  },
  computed: {
    /**
     * @description 列表数据
     */
    listMixinData () {
      return this.list.data
    },
    /**
     * @description 当前列表数据 - 除去占位
     */
    listMixinDataWithOutPlaceholder () {
      return this.listMixinIsHasPlaceholder
        ? without(this.listMixinData, this.list.placeholder.template)
        : this.listMixinData
    },
    /**
     * @description 是否可以继续加载
     */
    listMixinCanLoadMore () {
      return this.list.status.isSearched &&
        this.list.page.total !== 0 &&
        this.list.page.total !== this.listMixinData.length
    },
    /**
     * @description 是否已经加载完所有的数据
     */
    listMixinIsLoadedAll () {
      return this.list.status.isSearched &&
        this.list.page.total !== 0 &&
        this.list.page.total === this.listMixinData.length
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
    },
    /**
     * @description 当前列表中是否存在占位数据
     */
    listMixinIsHasPlaceholder () {
      return !!find(this.listMixinData, this.list.placeholder.template)
    }
  },
  beforeRouteLeave (to, from, next) {
    this.list.data = []
    next()
  },
  methods: {
    scrollTop () {
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
      this.listMixinData.push(
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
