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
export async function createFolder (dir) {
  const isExists = await getFolderStat(dir)
  // 如果该路径且不是文件，返回true
  if (isExists && isExists.isDirectory()) return true
  else if (isExists) return false
  // 如果该路径不存在 拿到上级路径
  const tempDir = path.parse(dir).dir
  // 递归判断，如果上级目录也不存在，则会代码会在此处继续循环执行，直到目录存在
  const status = await createFolder(tempDir)
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
export async function writeFile (folder, name, content) {
  await createFolder(folder)
  await fs.writeFileSync(path.join(folder, name), content)
}

/**
* @description 读取文件 以对象形式输出
* @param {string} folder 路径
* @param {string} name 文件名
* @param {string} content 如果文件不存在 返回的默认值
*/
export async function readFileAsObject (folder, name, content = {}) {
  try {
    return JSON.parse(await fs.readFileSync(path.join(folder, name), { encoding: 'utf-8' }))
  } catch (error) {
    return content
  }
}
