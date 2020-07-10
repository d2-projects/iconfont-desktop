import Vue from 'vue'

Vue.filter('numberFormat', function (value) {
  if (value >= 10000) {
    value = Math.round(value / 1000) / 10 + 'W'
  } else if (value >= 1000) {
    value = Math.round(value / 100) / 10 + 'K'
  }
  return value
})
