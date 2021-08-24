import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuesax from 'vuesax'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueMobileDetection from 'vue-mobile-detection'

import 'vuesax/dist/vuesax.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
Vue.use(Vuesax)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueMobileDetection)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
