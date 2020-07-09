<template>
  <div class="pa-5">
    <v-btn @click="loginWithGithub">loginWithGithub</v-btn>
    <v-btn @click="logoutGithub">退出 Github</v-btn>
    <v-btn @click="getPubinfo">getPubinfo</v-btn>
  </div>
</template>

<script>
import { fromPairs } from 'lodash-es'
import { remote } from 'electron'
import { mapActions } from 'vuex'
const BrowserWindow = remote.BrowserWindow

// const wait = time => new Promise(resolve => {
//   setTimeout(() => {
//     resolve()
//   }, time)
// })

export default {
  methods: {
    ...mapActions('sdk', [
      'init',
      'pubinfo'
    ]),
    async getPubinfo () {
      const result = await this.pubinfo()
      console.log(JSON.stringify(result, null, 4))
    },
    logoutGithub () {
      const win = new BrowserWindow({
        width: 1200,
        height: 700
      })
      win.loadURL('https://github.com/')
    },
    async loginWithGithub () {
      const win = new BrowserWindow({
        width: 1200,
        height: 700,
        show: false
      })
      win.once('ready-to-show', () => {
        win.show()
        const webContents = win.webContents
        webContents.on('did-navigate', async (event, url) => {
          console.log(url)
          if (/^https:\/\/www\.iconfont\.cn\/api\/login\/github\/callback\?.+$/.test(url)) {
            webContents.loadURL('https://www.iconfont.cn/api/login/github')
          }
          if (url === 'https://www.iconfont.cn/') {
            const ses = win.webContents.session
            const value = await ses.cookies.get({ domain: '.iconfont.cn' })
            const cookies = fromPairs(value.map(e => [e.name, e.value]))
            await this.init(cookies)
            win.close()
          }
        })
      })
      win.loadURL('https://www.iconfont.cn')
    }
  }
}
</script>
