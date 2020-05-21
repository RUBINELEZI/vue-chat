import Vue from 'vue'
import App from './App.vue'
import router from './router'

//scroll bottom plugin
import scroll from 'vue-chat-scroll'
Vue.use(scroll)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
