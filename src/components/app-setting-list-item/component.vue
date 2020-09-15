<style lang="scss">
@include b(setting-list-item) {
  fieldset {
    border-color: map-get($grey, 'lighten-3');
  }
  @extend .mb-4;
  &:last-child {
    @extend .mb-0;
  }
  @include when(label-left) {
    @extend .d-flex;
    @extend .align-start;
    @include e(label) {
      margin-top: 6px;
      margin-bottom: 6px;
      @extend .mr-4;
    }
    @include e(body) {
      min-height: 40px;
      @extend .app-setting-list-item__body;
      @extend .flex-grow-1;
      @extend .d-flex;
      @extend .align-center;
    }
  }
  @include when(label-top) {
    @include e(label) {
      @extend .mb-4;
    }
    @include e(body) {
      @extend .app-setting-list-item__body;
    }
  }
  @include e(label) {
    @extend .text-subtitle-1;
  }
}
</style>

<template>
  <div
    class="app-setting-list-item"
    :class="{
      'is-label-left': isLabelLeft,
      'is-label-top': isLabelTop
    }">
    <div
      v-if="!isLabelHide"
      class="app-setting-list-item__label"
      :class="labelClassName"
      :style="labelStyle">
      {{ label }}
    </div>
    <div class="app-setting-list-item__body">
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
    },
    noLabel: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isLabelHide () {
      return this.noLabel || (this.isLabelTop && !this.label)
    },
    isLabelTop () {
      return this.appSettingList.labelPosition === 'top'
    },
    isLabelLeft () {
      return this.appSettingList.labelPosition === 'left'
    },
    labelStyle () {
      return this.isLabelLeft ? { width: this.appSettingList.labelWidth + 'px' } : {}
    },
    labelClassName () {
      return this.isLabelLeft ? `text-${this.appSettingList.labelAlign}` : ''
    }
  }
}
</script>
