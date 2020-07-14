<template>
  <app-collection-skeleton
    type="list-item-avatar-two-line, image, list-item-two-line"
    height="350"
    :loading="loading">
    <v-card elevation="0">
      <v-card-text flex="cross:center">
        <v-avatar size="26" color="grey lighten-2" class="mr-2">
          <v-img v-if="avatar" :src="avatar"/>
          <span v-else class="grey--text text--lighten-5 text-caption font-weight-bold">
            {{ username[0] }}
          </span>
        </v-avatar>
        <span class="mr-auto">{{ username }}</span>
        <span v-if="isOfficial" class="font-weight-medium grey--text">
          官方图标
          <v-icon size="14" class="ml-1 grey--text">mdi-shield-check</v-icon>
        </span>
      </v-card-text>
      <app-collection-cover class="px-2" :value="icons"/>
      <v-card-text class="font-weight-medium is-nowrap pb-0">{{ name }}</v-card-text>
      <v-card-text flex="main:justify">
        <span>
          <span class="grey--text mr-1">icons</span>
          <span class="font-weight-medium red--text">x{{ countIcons }}</span>
        </span>
        <span>
          <span class="grey--text mr-1">visits</span>
          <span class="font-weight-medium">{{ countVisits | numberFormat }}</span>
        </span>
      </v-card-text>
      <v-divider/>
      <v-card-actions>
        <v-spacer/>
        <v-btn color="indigo" text>
          <v-icon size="16" left>mdi-thumb-up</v-icon>
          {{ countLikes | numberFormat }}
        </v-btn>
        <v-btn color="red" text>
          <v-icon size="16" left>mdi-heart</v-icon>
          {{ countFavorite | numberFormat }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </app-collection-skeleton>
</template>

<script>
export default {
  name: 'app-collection-item',
  props: {
    loading: { type: Boolean },
    name: { type: String, default: '' },
    username: { type: String, default: '' },
    avatar: { type: String, default: '' },
    isOfficial: { type: Boolean },
    icons: { type: Array, default: () => [] },
    countIcons: { type: Number, default: 0 },
    countVisits: { type: Number, default: 0 },
    countLikes: { type: Number, default: 0 },
    countFavorite: { type: Number, default: 0 }
  }
}
</script>
