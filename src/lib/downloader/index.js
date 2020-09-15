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
  // autoStart
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
    if (this.config.autoStart) {
      this.start()
    }
  }

  async createHelper ({
    url = '',
    folder = '',
    name = '',
    override = false
  }) {
    const ext = path.parse(url).ext
    const nameFromUrl = path.parse(url).base
    const helper = new DownloaderHelper(url, folder, {
      fileName: name ? name + ext : nameFromUrl,
      override
    })
    return helper
  }

  start () {
    this.helper && this.helper.start()
  }
}
