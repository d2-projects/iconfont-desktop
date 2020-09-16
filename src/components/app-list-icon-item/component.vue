<template>
  <app-square class="white rounded" center>
    <app-icon-render
      :value="icon.show_svg"
      :size="60"/>
  </app-square>
</template>

<script>
export default {
  name: 'app-list-icon-item',
  props: {
    icon: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
