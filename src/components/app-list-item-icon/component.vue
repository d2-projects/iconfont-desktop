<template>
  <app-list-item-content>
    <app-icon-render
      :value="icon.show_svg"
      :size="60"/>
  </app-list-item-content>
</template>

<script>
export default {
  name: 'app-list-item-icon',
  props: {
    icon: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
