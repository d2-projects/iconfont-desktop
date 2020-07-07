<template>
  <div>
    <v-text-field
      label="搜索"
      append-icon="mdi-magnify"
      filled
      clearable
      rounded
      single-line
      autofocus/>
    <v-card color="primary" dark flat>
      <v-row no-gutters>
        <v-col cols="4">
          <v-card-title>
            <v-icon large left>mdi-star-circle</v-icon>
            <span class="font-weight-light">分类</span>
          </v-card-title>
          <v-card-text>
            <v-radio-group v-model="collection">
              <v-radio
                v-for="option in dict.collection"
                :key="option.name"
                :label="option.label"
                :value="option.name"/>
            </v-radio-group>
          </v-card-text>
        </v-col>
        <v-col cols="4">
          <v-card-title>
            <v-icon large left>mdi-invert-colors</v-icon>
            <span class="font-weight-light">填充</span>
          </v-card-title>
          <v-card-text>
            <v-radio-group v-model="fills">
              <v-radio
                v-for="option in dict.fills"
                :key="option.name"
                :label="option.label"
                :value="option.name"/>
            </v-radio-group>
          </v-card-text>
        </v-col>
        <v-col cols="4">
          <v-card-title>
            <v-icon large left>mdi-palette</v-icon>
            <span class="font-weight-light">风格</span>
          </v-card-title>
          <v-card-text>
            <v-radio-group v-model="style">
              <v-radio
                v-for="option in dict.style"
                :key="option.name"
                :label="option.label"
                :value="option.name"/>
            </v-radio-group>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'app-search-bar',
  data () {
    return {
      collection: 'all',
      fills: 'all',
      style: 'all'
    }
  },
  computed: {
    ...mapState('sdk', [
      'dict'
    ])
  }
}
</script>
