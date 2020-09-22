<style lang="scss">
@include b(list-toolbar) {
  .v-input--selection-controls {
    margin-top: 0;
  }
}
</style>

<template>
  <div class="app-list-toolbar" flex="main:justify cross:center">
    <div>
      <v-checkbox
        v-if="selectActive"
        v-model="selectAll"
        label="全选"
        :ripple="false"
        hide-details/>
    </div>
    <div>
      <v-btn
        color="primary"
        :outlined="!selectActive"
        depressed
        @click="onClickActiveButton">
        {{ selectActive ? '取消选择' : '选择'}}
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app-list-toolbar',
  props: {
    selectActive: {
      type: Boolean
    }
  },
  data () {
    return {
      selectAll: false
    }
  },
  methods: {
    onClickActiveButton () {
      this.$emit('update:selectActive', !this.selectActive)
    }
  }
}
</script>
