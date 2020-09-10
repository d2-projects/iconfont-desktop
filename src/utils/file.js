import fs from 'fs'
import path from 'path'

/**
 * @description 读取路径信息
 * @param {string} path 路径
 */
function getFolderStat (path) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      if (err) resolve(false)
      else resolve(stats)
    })
  })
}

/**
* @description 创建路径
* @param {string} dir 路径
*/
function mkdir (dir) {
  return new Promise((resolve, reject) => {
    fs.mkdir(dir, err => {
      if (err) resolve(false)
      else resolve(true)
    })
  })
}

/**
* @description 路径是否存在，不存在则创建
* @param {string} dir 路径
*/
async function ensurePathSafe (dir) {
  let isExists = await getFolderStat(dir)
  // 如果该路径且不是文件，返回true
  if (isExists && isExists.isDirectory()) return true
  else if (isExists) return false
  // 如果该路径不存在 拿到上级路径
  let tempDir = path.parse(dir).dir
  // 递归判断，如果上级目录也不存在，则会代码会在此处继续循环执行，直到目录存在
  let status = await ensurePathSafe(tempDir)
  let mkdirStatus
  if (status) {
    mkdirStatus = await mkdir(dir)
  }
  return mkdirStatus
}

/**
* @description 安全地写文件 无需担心路径不存在
* @param {string} folder 路径
* @param {string} name 文件名
* @param {string} content 内容
*/
async function writeFileSafely ({
  folder,
  name,
  content
}) {
  await ensurePathSafe(folder)
  await fs.writeFileSync(path.join(folder, name), content)
}

export default {
  ensurePathSafe,
  writeFileSafely
}
