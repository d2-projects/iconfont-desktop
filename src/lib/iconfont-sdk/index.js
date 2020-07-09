import axios from 'axios'
import qs from 'qs'
import cookie from 'cookie'

export default class Iconfont {
  request = null
  ready = false
  baseURL = 'https://www.iconfont.cn'

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

  async getCookie () {
    const preload = await axios.get(this.baseURL)
    const data = Object.assign(
      {},
      ...preload.headers['set-cookie']
        .map(item => item.split(';')[0])
        .map(cookie.parse)
    )
    return data
  }

  cookiesSerialize (cookies = {}) {
    const result = Object.keys(cookies)
      .map(name => `${name}=${cookies[name]}`)
      .join('; ')
    console.log(result)
    return result
  }

  requestGenerator (cookies = {}) {
    const request = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      xsrfCookieName: 'ctoken',
      xsrfHeaderName: 'x-csrf-token',
      withCredentials: true,
      headers: {
        cookie: this.cookiesSerialize(cookies),
        'x-csrf-token': cookies.ctoken,
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    })
    request.interceptors.request.use(
      config => {
        if (config.method === 'post') {
          config.data.ctoken = cookies.ctoken
          config.data.t = new Date().getTime()
          config.data = qs.stringify(config.data)
        }
        return config
      },
      error => Promise.reject(error)
    )
    request.interceptors.response.use(
      response => {
        if (response.data.code === 200) {
          return response.data.data
        }
        return Promise.reject(new Error('请求错误'))
      },
      error => Promise.reject(error)
    )
    return request
  }

  async init (cookies) {
    const _cookies = cookies || await this.getCookie()
    console.log(_cookies)
    this.request = this.requestGenerator(_cookies)
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

  async pubinfo () {
    return this.request.get('api/pubinfo.json')
  }
}
