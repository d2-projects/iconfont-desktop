<style lang="scss">
@include b(setting-account) {
  @include e(form) {
    max-width: 400px;
  }
}
</style>

<route>
{
  "meta": {
    "title": "账户",
    "icon": "mdi-account-circle"
  }
}
</route>

<template>
  <div class="app-setting-account">
    <app-login v-if="!isLogged"/>
    <app-setting-list label-position="left" label-align="right">
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
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import appLogin from './__components__/login'

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
  components: {
    appLogin
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
