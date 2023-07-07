import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueForm from 'vue-form' 
import router from './router'

Vue.config.productionTip = false
Vue.use(VueForm);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
