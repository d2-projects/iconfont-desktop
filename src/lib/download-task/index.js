// https://www.npmjs.com/package/node-downloader-helper

import shortid from 'shortid'
import { DownloaderHelper } from 'node-downloader-helper'

/**
 * @description 下载任务的一项
 * @param {Object} setting {String} url 下载地址
 * @param {Object} setting {String} folder 目标文件夹
 * @param {Object} setting {String} fileName 下载到本地的文件名
 * @param {Object} setting {Function} onProgress 下载进度回调
 * @param {Object} setting {Function} onEnd 下载完成回调
 */
export default class DownloadTask {
  constructor ({
    url,
    folder,
    fileName,
    onProgress = function (stats) { console.log(stats) },
    onEnd = function (info) { console.log(info) }
  }) {
    this.id = shortid.generate()
    this.fileName = fileName

    this.downloaded = ''
    this.progress = 0
    this.total = ''

    // [ downloader.state ]
    // -> IDLE 等待
    // -> STARTED 已经开始
    // -> DOWNLOADING 正在下载
    // -> PAUSED 暂停
    // -> RESUMED 已经重新开始
    // -> STOPPED 已经停止
    // -> FINISHED 已经完成
    // -> FAILED 已经失败
    // -> RETRY 重试

    this.downloader = new DownloaderHelper(url, folder, {
      fileName,
      retry: { maxRetries: 3, delay: 1000 },
      override: true
    })

    // 下载完成
    this.downloader.on('end', info => {
      onEnd(info)
    })
    // 下载失败
    this.downloader.on('error', error => {
      console.log(error)
    })
    // 下载中
    this.downloader.on('progress', stats => {
      this.progress = Math.round(stats.progress)
      this.downloaded = stats.downloaded
      this.total = stats.total
      onProgress(stats)
    })
  }

  /**
   * @description 开始
   */
  start () {
    this.downloader.start()
  }

  /**
   * @description 暂停
   */
  pause () {
    this.downloader.pause()
  }

  /**
   * @description 恢复
   */
  resume () {
    // 如果可以恢复下载
    if (this.downloader.isResumable()) {
      this.downloader.resume()
    }
  }

  /**
   * @description 停止
   */
  stop () { this.downloader.stop() }
}
