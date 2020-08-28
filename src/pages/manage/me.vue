<template>
  <div>
    <app-links-btn-group :options="children" query/>
    <router-view/>
  </div>
</template>

<script>
const children = [
  {
    title: '资源',
    matchPath: '/manage/me/likes',
    route: {
      name: 'manage-me-resources-uploads'
    }
  },
  {
    title: '收藏',
    matchPath: '/manage/me/likes',
    route: {
      name: 'manage-me-likes-icons'
    }
  },
  {
    title: '项目',
    matchPath: '/manage/me/likes',
    route: {
      name: 'manage-me-projects-sponsor'
    }
  }
]

export default {
  data () {
    return {
      children
    }
  },
  methods: {
    onChildPageTabTabClick (name) {
      this.$router.replace({
        name,
        query: this.$route.query
      })
    }
  }
}
</script>
