import Vue from 'vue'
import App from './App.vue'
// import 'buefy/lib/buefy.css'

Vue.use(App)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')

export default App
