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
    <app-setting-list label-position="left" label-align="right" class="mb-5">
      <app-setting-list-item label="昵称">
        <v-text-field
          v-model="user.nickname"
          outlined
          dense
          single-line
          hide-details/>
      </app-setting-list-item>
      <app-setting-list-item label="昵称">
        <v-text-field
          v-model="user.nickname"
          outlined
          dense
          single-line
          hide-details/>
      </app-setting-list-item>
    </app-setting-list>
    <app-setting-list>
      <app-setting-list-item label="昵称">
        <v-text-field
          v-model="user.nickname"
          outlined
          dense
          single-line
          hide-details/>
      </app-setting-list-item>
      <app-setting-list-item label="昵称">
        <v-text-field
          v-model="user.nickname"
          outlined
          dense
          single-line
          hide-details/>
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
        this.user = result
      }
    },
    submit () {}
  }
}
</script>
