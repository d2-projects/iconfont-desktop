<style lang="scss">
@include b(page-setting) {
  $sidebarWidth: 260px;
  @extend %absoluteParent;
  @include e(sidebar) {
    width: $sidebarWidth;
    @extend %absoluteLeft;
  }
  @include e(main) {
    left: $sidebarWidth;
    @extend %absoluteRight;
  }
}
</style>

<route>
{
  "meta": {
    "sdk": true
  }
}
</route>

<template>
  <div class="app-page-setting">
    <div class="app-page-setting__sidebar">
      <app-list class="white">
        <v-list flat>
          <v-subheader>设置</v-subheader>
          <v-list-item-group v-model="active" color="primary">
            <v-list-item v-for="menu of menus" :key="menu.value" :value="menu.value">
              <v-list-item-icon>
                <v-icon>{{ menu.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ menu.label }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </app-list>
    </div>
    <div class="app-page-setting__main">
      <app-list>
        <router-view/>
      </app-list>
    </div>
  </div>
</template>

<script>
import { find, get } from 'lodash-es'
import routes from 'vue-auto-routing'

export default {
  data () {
    return {
      active: 'account'
    }
  },
  computed: {
    menus () {
      return get(find(routes, { name: 'setting' }), 'children', []).map(route => ({
        label: route.meta.title,
        value: route.name,
        icon: route.meta.icon
      }))
    }
  }
}
</script>
