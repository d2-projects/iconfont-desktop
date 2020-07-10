import Vue from 'vue'
const files = require.context('./automatic-register/', true, /component\.vue$/)

files.keys().forEach(key => {
  Vue.component(files(key).default.name, files(key).default)
})
