export default {
  // icon
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
  ],
  // collection
  collectionType: [
    { label: '所有', name: '3', value: 3 },
    { label: '官方', name: '1', value: 1 },
    { label: '多色', name: '2', value: 2 },
    { label: '单色', name: '4', value: 4 }
  ],
  collectionSort: [
    { label: '时间', name: 'time', value: 'time' },
    { label: '点赞数', name: 'like', value: 'like' },
    { label: '收藏数', name: 'favorite', value: 'favorite' },
    { label: '图标数', name: 'icon', value: 'icon' },
    { label: '访问量', name: 'visit', value: 'visit' }
  ]
}
