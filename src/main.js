import Vue from 'vue'
import store from './store/index'
import App from './App.vue'
import router from './router/index'
import 'bootstrap'
import '@/assets/style/app.scss'

Vue.config.productionTip = false
Vue.prototype.$eventHub = new Vue()

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
