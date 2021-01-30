import Vue from 'vue'

// Vue material
import App from './App.vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(VueMaterial)
Vue.config.productionTip = false

let app = null

function createApp() {
  if(!app) {
    app = new Vue({
      render: h => h(App),
    }).$mount('#app')
  }
  else {
    app.$destroy()
    app = null
    createApp()
  }
}

createApp()

export default {
  reloadApp: createApp,
}