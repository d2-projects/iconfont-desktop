<route>
{
  "meta": {
    "title": "账户",
    "icon": "mdi-account-circle",
    "sort": 0
  }
}
</route>

<template>
  <app-login-after>
    <app-setting-list label-position="left" label-align="right">
      <app-setting-list-header title="连接" description="在客户端登录或退出您的 iconfont+ 账户"/>
      <app-setting-list-item label="登出">
        <v-btn outlined color="error" @click="logout">退出登录</v-btn>
      </app-setting-list-item>
    </app-setting-list>
    <app-setting-list label-position="left" label-align="right">
      <app-setting-list-header title="用户信息" description="修改用户头像和其它用户数据"/>
      <app-setting-list-item label="头像">
        <app-upload v-model="user.avatar">
          <template v-slot="{ src }">
            <v-avatar size="100">
              <img :src="src">
            </v-avatar>
          </template>
        </app-upload>
      </app-setting-list-item>
      <app-setting-list-text-field label="昵称" v-model="user.nickname"/>
      <app-setting-list-text-field label="QQ" v-model="user.qq"/>
      <app-setting-list-text-field label="联系邮箱" v-model="user.show_email"/>
      <app-setting-list-text-field label="个性签名" v-model="user.bio"/>
      <app-setting-list-item label="支付宝打赏">
        <app-upload v-model="user.alipay_code"/>
      </app-setting-list-item>
      <app-setting-list-item>
        <v-btn outlined color="primary" @click="submit">保存</v-btn>
      </app-setting-list-item>
    </app-setting-list>
  </app-login-after>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      demo: '',
      user: {
        alipay_code: '',
        avatar: '',
        bio: '',
        id: 0,
        isXiaoer: false,
        nickname: '',
        qq: '',
        show_email: '',
        weixin_code: ''
      }
    }
  },
  computed: {
    ...mapState('sdk', [
      'sdk'
    ]),
    ...mapGetters('sdk', [
      'isLogged'
    ])
  },
  created () {
    this.load()
  },
  watch: {
    isLogged: 'load'
  },
  methods: {
    ...mapActions('sdk', [
      'logout'
    ]),
    async load () {
      if (this.isLogged) {
        const result = await this.sdk.userDetail()
        this.user = Object.assign({}, this.user, result)
      }
    },
    async submit () {
      try {
        await this.sdk.userUpdate(this.user)
        this.$toasted.global.app_success()
        this.load()
      } catch (error) {
        this.$toasted.global.app_error({ message: error.message })
      }
    }
  }
}
</script>
