<route>
{
  "meta": {
    "title": "账户",
    "icon": "mdi-account-circle"
  }
}
</route>

<template>
  <div>
    <app-login/>
  </div>
</template>

<script>
import appLogin from './__components__/login'

export default {
  components: {
    appLogin
  }
}
</script>
