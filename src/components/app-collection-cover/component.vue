<style lang="scss">
@include b(collection-cover) {
  overflow: hidden;
  @include e(responsive) {
    width: 20%;
    float: left;
  }
}
</style>

<template>
  <div class="app-collection-cover is-pointer" @click="onClick">
    <v-row v-if="illustration" dense>
      <v-col
        v-for="(item, itemIndex) of list"
        :key="itemIndex"
        cols="4">
        <v-img :aspect-ratio="1" :src="item.file" contain/>
      </v-col>
    </v-row>
    <template v-else>
      <app-square
        v-for="(item, itemIndex) of list"
        :key="itemIndex"
        class="app-collection-cover__responsive"
        center>
        <app-icon-render :value="item.show_svg" :size="32"/>
      </app-square>
    </template>
  </div>
</template>

<script>
import { take } from 'lodash-es'

export default {
  name: 'app-collection-cover',
  props: {
    value: {
      type: Array,
      default: () => []
    },
    id: {
      type: Number,
      default: 0
    },
    illustration: {
      type: Boolean
    }
  },
  computed: {
    list () {
      return take(this.value, 5 * 3)
    }
  },
  methods: {
    onClick () {
      this.$router.replace({
        name: this.illustration ? 'illustration-detail' : 'collection-detail',
        query: {
          id: this.id
        }
      })
    }
  }
}
</script>
