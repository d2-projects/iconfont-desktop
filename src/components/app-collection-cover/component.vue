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
import { take, concat } from 'lodash-es'

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
      const count = this.illustration ? 2 * 3 : 5 * 3
      const list = take(this.value, count)
      const supplementLength = count - list.length
      const supplementList = Array.from(
        {
          length: supplementLength
        },
        () => ({
          file: '',
          show_svg: ''
        })
      )
      return concat(list, supplementList)
    }
  },
  methods: {
    onClick () {
      if (this.illustration) this.$go.detail.illustration(this.id)
      else this.$go.detail.collection(this.id)
    }
  }
}
</script>
