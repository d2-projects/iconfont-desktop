import axios from 'axios'
import qs from 'qs'

export default class Iconfont {
  ctoken = ''
  request = null
  ready = false

  constructor () {}

  static dict = {
    collection: [
      { label: '全部图标', name: 'all', value: -1 },
      { label: '精选图标', name: 'selected', value: 1 }
    ],
    fills: [
      { label: '所有颜色', name: 'all', value: '' },
      { label: '多色图标', name: 'multiple', value: 1 },
      { label: '单色图标', name: 'single', value: 0 }
    ],
    style: [
      { label: '全部', name: 'all', value: '' },
      { label: '线性', name: 'line', value: 'line' },
      { label: '面性', name: 'fill', value: 'fill' },
      { label: '扁平', name: 'flat', value: 'flat' },
      { label: '手绘', name: 'hand', value: 'hand' },
      { label: '简约', name: 'simple', value: 'simple' },
      { label: '精美', name: 'complex', value: 'complex' }
    ]
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
        return Promise.reject(new Error('请求错误'))
      },
      error => Promise.reject(error)
    )
    this.setReady(true)
  }

  setReady (ready = false) {
    this.ready = ready
  }

  async search ({
    keyword = '',
    pageNo = 1,
    pageSize = 10,
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
