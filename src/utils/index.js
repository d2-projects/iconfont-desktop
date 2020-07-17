import { findIndex } from 'lodash-es'

/**
 * @description 检查一个项目是否在指定的数组里
 * @param {Any} value 需要匹配的内容
 * @param {Array} source 被检查的数组
 */
export const oneOf = (value, source = []) => findIndex(source, item => item === value) !== -1
