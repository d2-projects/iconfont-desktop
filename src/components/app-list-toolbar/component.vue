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
        v-if="isSelectActive"
        :value="isSelectedAll"
        label="全选"
        :ripple="false"
        hide-details/>
    </div>
    <div>
      <v-btn
        color="primary"
        :outlined="!isSelectActive"
        depressed
        @click="onClickActiveButton">
        {{ isSelectActive ? '取消选择' : '选择'}}
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app-list-toolbar',
  props: {
    isSelectedAll: {
      type: Boolean
    },
    isSelectActive: {
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
      this.$emit('select-active-change', !this.isSelectActive)
    }
  }
}
</script>
