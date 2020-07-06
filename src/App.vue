<template>
  <router-view/>
</template>

<script>
import { remote } from 'electron'
const Iconfont = remote.getGlobal('Iconfont')

export default {
  name: 'App',
  async mounted () {
    const iconfont = new Iconfont()
    await iconfont.init()
    const searchResult = await iconfont.search({
      keyword: 'right'
    })
    console.log(searchResult)
  }
}
</script>
