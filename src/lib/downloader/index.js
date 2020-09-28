import path from 'path'
import { DownloaderHelper } from 'node-downloader-helper'
import { createFolder } from '@/utils/file.js'

// https://github.com/hgouveia/node-downloader-helper

// const url = 'http://cdn.d2.pub/mirrors/d2-projects/electron-vue-template/releases/download/v1.25.0/electron-vue-template-portable-1.25.0.exe'

export default class Downloader {
  // url
  // folder
  // fileName
  // override
  constructor (config) {
    // 配置项 用于恢复下载
    this.config = config
    // 下载器
    this.helper = null
    // 初始化
    this.init()
  }

  async init () {
    // 确保目录存在
    await createFolder(this.config.folder)
    // 初始化下载器
    this.helper = await this.createHelper(this.config)
    // 自动开始任务
    this.start()
  }

  supplementUrl (url) {
    if (/^https:/.test(url)) return url
    return 'https:' + url
  }

  async createHelper ({
    url = '',
    folder = '',
    name = '',
    override = false
  }) {
    const urlSafe = this.supplementUrl(url)
    const urlParsed = path.parse(urlSafe)
    const helperOptions = {
      fileName: name ? name + urlParsed.ext : urlParsed.base,
      override
    }
    const helper = new DownloaderHelper(urlSafe, folder, helperOptions)
    return helper
  }

  start () {
    this.helper && this.helper.start()
  }
}
