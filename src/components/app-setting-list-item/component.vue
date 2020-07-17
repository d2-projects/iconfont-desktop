<style lang="scss">
@include b(setting-list-item) {
  fieldset {
    border-color: map-get($grey, 'lighten-3');
  }
  @extend .mb-4;
  &:last-child {
    @extend .mb-0;
  }
}
</style>

<template>
  <div class="app-setting-list-item" :class="classNames">
    <div
      class="text-subtitle-1"
      :class="labelClassNames"
      :style="labelStyle">
      {{ label }}
    </div>
    <div :class="bodyClassNames">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app-setting-list-item',
  inject: {
    appSettingList: {
      default: () => ({})
    }
  },
  props: {
    label: {
      type: String,
      default: ''
    }
  },
  computed: {
    isLabelTop () {
      return this.appSettingList.labelPosition === 'top'
    },
    isLabelLeft () {
      return this.appSettingList.labelPosition === 'left'
    },
    labelStyle () {
      return this.isLabelLeft ? {
        width: this.appSettingList.labelWidth + 'px'
      } : {}
    },
    classNames () {
      return this.isLabelLeft ? [
        'd-flex',
        'align-center'
      ] : []
    },
    labelClassNames () {
      return this.isLabelLeft ? [
        'mr-4',
        `text-${this.appSettingList.labelAlign}`
      ] : [
        'mb-4'
      ]
    },
    bodyClassNames () {
      return this.isLabelLeft ? [
        'flex-grow-1'
      ] : []
    }
  }
}
</script>
