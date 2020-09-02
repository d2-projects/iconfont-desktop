<style lang="scss">
@include b(login) {
  max-width: 600px;
  @include e(logo) {
    width: 106px;
  }
}
</style>

<template>
  <v-responsive class="app-login absolute-parent mx-auto" :aspect-ratio="2/1">
    <planet class="absolute-all"/>
    <div class="absolute-bottom">
      <p class="text-center text-caption grey--text lighten-5 mb-1">
        登录到 iconfont+ 获得更全面的功能体验
      </p>
      <p class="text-center text-caption grey--text lighten-3">
        数据的访问原理与网站一致，在登录过程中 Iconfont Desktop 不会获取您的账号密码
      </p>
    </div>
    <div class="absolute-all" flex="dir:top main:center cross:center">
      <img
        class="app-login__logo mb-5"
        src="@/assets/image/logo/iconfont/text.svg"
        alt="iconfont">
      <v-row class="flex-grow-0">
        <v-col>
          <v-btn color="blue-grey lighten-5" @click="login" outlined>
            Github
            <v-icon right dark>mdi-github</v-icon>
          </v-btn>
        </v-col>
        <v-col>
          <v-btn color="orange" @click="login" outlined>
            新浪微博
            <v-icon right dark>mdi-sina-weibo</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </v-responsive>
</template>

<script>
import { mapActions } from 'vuex'
import planet from './planet'

export default {
  name: 'app-login',
  components: {
    planet
  },
  methods: {
    ...mapActions('sdk', [
      'login'
    ])
  }
}
</script>
