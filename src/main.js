import Vue from 'vue'
import { default as TonyLogin } from './App.vue'
// import 'buefy/lib/buefy.css'

Vue.use(TonyLogin, {svgURL: '/img/tony.svg'})
Vue.config.productionTip = true

new Vue({
  render: h => h(TonyLogin)
}).$mount('#app')

export default TonyLogin
