export default {
  data () {
    return {
      // 搜索条件
      keyword: '',
      pageNo: 1,
      pageSize: 6,
      // 搜索结果
      list: [],
      total: 0,
      // 搜索状态
      isSearched: false,
      isSearching: false,
      // 自动加载前几页
      autoLoadCount: 0,
      autoLoadCountMax: 5
    }
  },
  computed: {
    canLoadMore () {
      return this.isSearched && this.total !== 0 && this.total !== this.list.length
    },
    isLoadedAll () {
      return this.isSearched && this.total !== 0 && this.total === this.list.length
    },
    isNoResult () {
      return this.isSearched && this.total === 0
    },
    canAutoLoad () {
      return this.autoLoadCount < this.autoLoadCountMax
    }
  },
  methods: {
    onInCordonY () {
      if (!this.isSearching && this.canLoadMore && this.canAutoLoad) {
        this.autoLoadCount += 1
        this.loadMore()
      }
    },
    reset () {
      this.list = []
      this.pageNo = 1
      this.isSearched = false
      this.autoLoadCount = 0
    },
    reload () {
      this.reset()
      this.load()
    },
    load () {},
    loadMore () {
      this.load()
    },
    async fetchList (promise) {
      if (!this.keyword || this.isSearching) {
        return Promise.reject(Error('请求取消'))
      }
      this.isSearching = true
      const result = await promise
      this.isSearched = true
      this.isSearching = false
      return result
    }
  }
}
