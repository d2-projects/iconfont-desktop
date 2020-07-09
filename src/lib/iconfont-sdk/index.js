import axios from 'axios'
import qs from 'qs'
import cookie from 'cookie'
import dictionary from './dictionary'

export default class Iconfont {
  // iconfont 官网地址
  baseURL = 'https://www.iconfont.cn'
  // 用于网络请求的实例
  request = null

  static dictionary = dictionary

  constructor () {}

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
    const _cookies = cookies || await this.getCookie()
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
          config.data = qs.stringify(config.data)
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
  }

  /**
   * @description [API] 公共数据
   */
  async pubinfo () {
    return this.request.get('api/pubinfo.json')
  }

  /**
   * @description [API] 图标搜索
   */
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
