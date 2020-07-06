import axios from 'axios'
import qs from 'qs'

class Iconfont {

  ctoken = ''

  request = null

  constructor () {
    this.init()
  }

  async init () {
    const preload = await axios.get('https://www.iconfont.cn')
    let cookie = ''
    preload.headers['set-cookie'].forEach(item => {
      cookie += item.split(';')[0] + ';'
      if (item.includes('ctoken')) {
        this.ctoken = item.match(/ctoken=(.*?);/)[1]
      }
    })
    this.request = axios.create({
      baseURL: 'https://www.iconfont.cn',
      timeout: 10000,
      xsrfCookieName: 'ctoken',
      xsrfHeaderName: 'x-csrf-token',
      withCredentials: true,
      headers: {
        cookie: cookie,
        'x-csrf-token': this.ctoken,
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    })
    this.request.interceptors.request.use(
      config => {
        config.data.ctoken = this.ctoken
        config.data.t = new Date().getTime()
        config.data = qs.stringify(config.data)
        return config
      },
      error => Promise.reject(error)
    )
    this.request.interceptors.response.use(
      response => {
        if (response.data.code === 200) {
          return response.data.data
        }
        return Promise.reject('请求错误')
      },
      error => Promise.reject(error)
    )
  }

  static optionsCollection = [
    { label: '全部图标', value: -1 },
    { label: '精选图标', value: 1 }
  ]

  static optionsFills = [
    { label: '所有颜色', value: '' },
    { label: '多色图标', value: 1 },
    { label: '单色图标', value: 0 }
  ]

  static optionsStyle = [
    { label: '线性', value: 'line' },
    { label: '面性', value: 'fill' },
    { label: '扁平', value: 'flat' },
    { label: '手绘', value: 'hand' },
    { label: '简约', value: 'simple' },
    { label: '精美', value: 'complex' }
  ]

  async search ({
    keyword = '',
    pageNo = 1,
    pageSize = 1,
    sortType = 'updated_at',
    collection = -1,
    fills = '',
    style = ''
  }) {
    const data = {
      page: pageNo,
      pageSize: pageSize,
      q: keyword,
      sortType: sortType,
      fromCollection: collection,
      fills: fills
    }
    if (style) {
      data[style] = 1
    }
    return this.request.post('api/icon/search.json', data)
  }
}

;(async () => {
  const iconfont = new Iconfont()
  await iconfont.init()
  const searchResult = await iconfont.search({
    keyword: 'left',
    style: 'hand'
  })
  console.log(searchResult)
})()
