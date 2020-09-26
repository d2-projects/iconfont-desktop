<template>
  <v-avatar
    :size="size"
    color="grey lighten-2"
    class="is-pointer"
    @click="onClick">
    <v-img
      v-if="avatar"
      :src="avatar"/>
    <span
      v-else-if="name"
      class="grey--text text--lighten-5 font-weight-bold"
      :class="textClass">
      {{ name[0] }}
    </span>
  </v-avatar>
</template>

<script>
export default {
  name: 'app-avatar',
  props: {
    userId: {
      type: Number,
      default: 0
    },
    avatar: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 30
    },
    textClass: {
      type: String,
      default: ''
    }
  },
  methods: {
    onClick () {
      if (this.userId) {
        this.$go.user.detail(this.userId)
      } else {
        this.$emit('click')
      }
    }
  }
}
</script>
