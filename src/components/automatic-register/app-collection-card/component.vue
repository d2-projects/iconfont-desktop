<template>
  <v-hover>
    <template v-slot="{ hover }">
      <v-card :class="`elevation-${ hover ? 6 : 1 }`" class="transition-swing">
        <v-card-text flex="cross:center">
          <v-avatar size="26" color="grey lighten-2" class="mr-2">
            <v-img v-if="value.User.avatar" :src="value.User.avatar"/>
            <span v-else class="grey--text text--lighten-5 text-caption font-weight-bold">{{ value.User.nickname[0] }}</span>
          </v-avatar>
          <span class="mr-auto">{{ value.User.nickname }}</span>
          <span v-if="value.is_official === 1" class="font-weight-medium grey--text">
            官方图标
            <v-icon size="14" class="ml-1 grey--text">mdi-shield-check</v-icon>
          </span>
        </v-card-text>
        <app-collection-card-cover class="px-2" :value="value.icons"/>
        <v-card-text class="font-weight-medium pb-0">{{ value.name }}</v-card-text>
        <v-card-text flex="main:justify">
          <span>
            <span class="grey--text">icons </span>
            <span class="font-weight-medium red--text">x{{ value.icons_count }}</span>
          </span>
          <span>
            <span class="grey--text">visits </span>
            <span class="font-weight-medium">{{ value.visits_count | numberFormat }}</span>
          </span>
        </v-card-text>
        <v-divider/>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="indigo" text small>
            <v-icon size="16" left>mdi-thumb-up</v-icon>
            {{ value.likes_count | numberFormat }}
          </v-btn>
          <v-btn color="red" text small>
            <v-icon size="16" left>mdi-heart</v-icon>
            {{ value.favorite_count | numberFormat }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-hover>
</template>

<script>
export default {
  name: 'app-collection-card',
  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
