<template>
  <div class="os-host">
    <div class="os-resize-observer-host"></div>
    <div class="os-padding">
      <div class="os-viewport">
        <div class="os-content">
          <slot/>
        </div>
      </div>
    </div>
    <div class="os-scrollbar os-scrollbar-horizontal ">
      <div class="os-scrollbar-track">
        <div class="os-scrollbar-handle"></div>
      </div>
    </div>
    <div class="os-scrollbar os-scrollbar-vertical">
      <div class="os-scrollbar-track">
        <div class="os-scrollbar-handle"></div>
      </div>
    </div>
    <div class="os-scrollbar-corner"></div>
  </div>
</template>

<script>
import {
  map,
  isFunction,
  assignWith,
  fromPairs,
  camelCase
} from 'lodash-es'
import OverlayScrollbars from 'overlayscrollbars'
import 'overlayscrollbars/css/OverlayScrollbars.css'

// https://kingsora.github.io/OverlayScrollbars/#!documentation/options

export default {
  name: 'app-scroll',
  props: {
    options: {
      type: Object
    },
    extensions: {
      type: [String, Array, Object]
    }
  },
  data () {
    return {
      osInstance: null
    }
  },
  watch: {
    options (options) {
      if (OverlayScrollbars.valid(this.osInstace)) {
        this.osInstace.options(options)
      }
    }
  },
  mounted () {
    this.init()
  },
  beforeDestroy () {
    if (OverlayScrollbars.valid(this.osInstance)) {
      this.osInstance.destroy()
      this.osInstance = null
    }
  },
  methods: {
    getOsInstance () {
      return this.osInstance
    },
    getOsTarget () {
      return this.$el || null
    },
    init () {
      const osCallbacks = [
        'onInitialized',
        'onInitializationWithdrawn',
        'onDestroyed',
        'onScrollStart',
        'onScroll',
        'onScrollStop',
        'onOverflowChanged',
        'onOverflowAmountChanged',
        'onDirectionChanged',
        'onContentSizeChanged',
        'onHostSizeChanged',
        'onUpdated'
      ]
      const osOptionsDefault = {
        scrollbars: {
          autoHide: 'move'
        },
        callbacks: fromPairs(map(osCallbacks, name => [
          name,
          event => this.$emit(camelCase(name.replace(/^on/, '')), event)
        ]))
      }
      const customizer = (left, right, key) => {
        if (key === 'callbacks') {
          return assignWith({}, left, right, (leftFn, rightFn) => {
            if (leftFn && rightFn) {
              return (event) => {
                leftFn(event)
                if (isFunction(rightFn)) rightFn(event)
              }
            }
          })
        }
      }
      const osOptionsMerged = assignWith({}, osOptionsDefault, this.options, customizer)
      const osTarget = this.getOsTarget()
      this.osInstance = OverlayScrollbars(
        osTarget,
        osOptionsMerged,
        this.extensions
      )
    }
  }
}
</script>
