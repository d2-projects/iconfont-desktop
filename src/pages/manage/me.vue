<template>
  <div>
    <v-btn-toggle :value="$route.name" rounded dense>
      <v-btn
        v-for="route of childRoutes"
        :key="route.name"
        :value="route.name"
        @click="onChildPageTabTabClick(route.name)">
        {{ route.title }}
      </v-btn>
    </v-btn-toggle>
    <router-view/>
  </div>
</template>

<script>
const childRoutes = [
  { title: '资源', name: 'manage-me-resources-uploads' },
  { title: '收藏', name: 'manage-me-likes-icons' },
  { title: '项目', name: 'manage-me-projects-sponsor' }
]

export default {
  data () {
    return {
      childRoutes
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
