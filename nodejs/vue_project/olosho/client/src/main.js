
import Vue from 'vue'
import App from './App'
import VeeValidate from 'vee-validate'
import router from './router'
import store from '../store'
import '@/assets/css/tailwind.css'
import {
  library
} from '@fortawesome/fontawesome-svg-core'
import {
  faAngleRight
} from '@fortawesome/free-solid-svg-icons'
import {
  FontAwesomeIcon
} from '@fortawesome/vue-fontawesome'
library.add(faAngleRight)

Vue.component('font-awesome-icon', FontAwesomeIcon)
/* import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import 'vue-material/dist/theme/black-green-light.css'
import 'materialize-css'

import 'materialize-css/dist/js/materialize.min.js'
import 'materialize-css/dist/css/materialize.min.css' */

// Vue.use(VueMaterial)
// i just included this line
Vue.use(VeeValidate)
Vue.config.devtools = true
//
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
