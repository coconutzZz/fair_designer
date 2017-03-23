import Vue from 'vue'
import store from './store'
import App from './components/App.vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import './external/font-faces.css'
import './external/material-icons.css'

Vue.use(VueMaterial)
export default new Vue({
  store, // inject store to all children
  ...App
})
