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
    {{ form }}
    <!-- <form class="app-setting-account__form mx-auto">
      <v-card elevation="0">
        <v-card-text>
          <v-text-field
            v-model="form.nickname"
            label="昵称"
            outlined
            dense/>
          <v-text-field
            v-model="form.qq"
            label="QQ"
            outlined
            dense/>
          <v-text-field
            v-model="form.email"
            label="邮箱"
            outlined
            dense/>
          <v-textarea
            v-model="form.bio"
            label="签名"
            outlined
            dense/>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="submit" text>保存</v-btn>
        </v-card-actions>
      </v-card>
    </form> -->
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import appLogin from './__components__/login'

export default {
  data () {
    return {
      form: {
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
        this.form = result
      }
    },
    submit () {}
  }
}
</script>
