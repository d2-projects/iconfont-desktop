import { isEmpty } from 'lodash-es'
import axios from 'axios'
import qs from 'qs'
import cookie from 'cookie'
import dictionary from './dictionary'

export default class Iconfont {
  // iconfont 官网地址
  baseURL = 'https://www.iconfont.cn'
  // 用于网络请求的实例
  request = null
  // [数据] 当前用户的信息
  user = {}
  // [数据] 全站图标数量
  iconCount = 0

  static dictionary = dictionary

  constructor () {}

  isReady () {
    return this.request !== null
  }

  /**
   * @description 获取基本的 cookie 注意这里获取的是未登录的状态 无法使用用户相关的功能
   */
  async getCookie () {
    const preload = await axios.get(this.baseURL)
    const headers = preload.headers['set-cookie']
    const data = Object.assign(
      {},
      ...headers
        .map(item => item.split(';')[0])
        .map(cookie.parse)
    )
    return data
  }

  /**
   * @description 将 cookie 对象拼接为一个字符串
   */
  cookiesSerialize (cookies = {}) {
    return Object.keys(cookies)
      .map(name => `${name}=${cookies[name]}`)
      .join('; ')
  }

  /**
   * @description 创建一个请求实例
   * @param {Object} cookies 使用指定的 cookie 初始化
   */
  async requestGenerator (cookies) {
    const _cookies = isEmpty(cookies) ? await this.getCookie() : cookies
    const request = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      xsrfCookieName: 'ctoken',
      xsrfHeaderName: 'x-csrf-token',
      withCredentials: true,
      headers: {
        cookie: this.cookiesSerialize(_cookies),
        'x-csrf-token': _cookies.ctoken,
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    })
    request.interceptors.request.use(
      config => {
        if (config.method === 'post') {
          config.data.t = new Date().getTime()
          config.data.ctoken = _cookies.ctoken
          config.data = qs.stringify(config.data)
          console.log(config.data)
        }
        if (config.method === 'get') {
          const params = config.params || {}
          params.t = new Date().getTime()
          params.ctoken = _cookies.ctoken
          config.params = params
          console.log(config.params)
        }
        return config
      },
      error => Promise.reject(error)
    )
    request.interceptors.response.use(
      response => response.data.code === 200 ? response.data.data : Promise.reject(new Error('请求错误')),
      error => Promise.reject(error)
    )
    return request
  }

  /**
   * @description 初始化请求实例
   * @param {Object} cookies 使用指定的 cookie 初始化
   */
  async init (cookies) {
    this.request = await this.requestGenerator(cookies)
    const pubinfo = await this.pubinfo()
    this.user = pubinfo.user || {}
    this.iconCount = pubinfo.iconCount || 0
    return pubinfo
  }

  /**
   * @description [API] 公共数据
   * @description 这个方法会在 init 后自动调用
   */
  async pubinfo () {
    return this.request.get('api/pubinfo.json')
  }

  /**
   * @description [API] 首页数据
   */
  async commonIndexConfig () {
    return this.request.get('api/common/indexConfig.json', {
      params: {
        name: 1
      }
    })
  }

  /**
   * @description [API] 图标搜索
   */
  async iconSearch ({
    keyword = '',
    sort = 'updated_at',
    collection = -1,
    fills = '',
    style = '',
    pageNo = 1,
    pageSize = 10
  }) {
    const data = {
      page: pageNo,
      pageSize: pageSize,
      q: keyword,
      sortType: sort,
      fromCollection: collection,
      fills: fills
    }
    if (style) {
      data[style] = 1
    }
    return this.request.post('api/icon/search.json', data)
  }


  /**
   * @description [API] 图标库搜索
   */
  async collections ({
    keyword = '',
    type = 3,
    sort = 'time',
    pageNo = 1,
    pageSize = 9
  }) {
    return this.request.get('api/collections.json', {
      params: {
        type: type,
        sort: sort,
        limit: pageSize,
        page: pageNo,
        keyword: keyword
      }
    })
  }
}
