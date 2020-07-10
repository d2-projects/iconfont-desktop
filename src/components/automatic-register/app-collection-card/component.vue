<template>
  <v-card>
    <v-list-item>
      <v-list-item-avatar size="24" color="grey darken-3">
        <v-img :src="value.User.avatar"></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-subtitle>{{ value.User.nickname }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <app-collection-card-cover
      class="px-2"
      :value="value.icons"/>
    <v-card-text>
      {{ value.name }}
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-icon size="16" class="mr-1 grey--text lighten-1">mdi-account-supervisor</v-icon>
      <span class="subheading mr-4 grey--text lighten-1">256</span>
      <v-icon size="14" class="mr-1 grey--text lighten-1">mdi-thumb-up</v-icon>
      <span class="subheading mr-4 grey--text lighten-1">256</span>
      <v-icon size="14" class="mr-1 grey--text lighten-1">mdi-heart</v-icon>
      <span class="subheading grey--text lighten-1">45</span>
    </v-card-actions>
  </v-card>
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
