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
    listMixinCanLoadMore () {
      return this.list.status.isSearched &&
        this.list.page.total !== 0 &&
        this.list.page.total !== this.list.data.length
    },
    listMixinIsLoadedAll () {
      return this.list.status.isSearched &&
        this.list.page.total !== 0 &&
        this.list.page.total === this.list.data.length
    },
    listMixinIsNoResult () {
      return this.list.status.isSearched &&
        this.list.page.total === 0
    },
    listMixinCanDoLoad () {
      return (this.list.setting.searchWithoutKeywords || this.list.query.keyword) && !this.list.status.isSearching
    },
    listMixinCanAutoLoad () {
      return this.list.autoLoad.count < this.list.autoLoad.max
    },
    listMixinIsHasPlaceholder () {
      return !!find(this.list.data, this.list.placeholder.template)
    },
    listMixinDataWithOutPlaceholder () {
      return without(this.list.data, this.list.placeholder.template)
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
      if (
        !this.list.status.isSearching &&
          this.listMixinCanLoadMore &&
          this.listMixinCanAutoLoad
      ) {
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
