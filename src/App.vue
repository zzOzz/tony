<template>
  <div id="app" class="card container">
    <Tony msg="Click" :xfactor="slider" :hide="hide" class="card-image"/>
    <section class="card-content">
      <b-field>
        <b-input placeholder="Email"
            type="email"
            icon="email" v-model="email" @focus="focusOnEmail" >
        </b-input>
      </b-field>
      <b-field>
        <b-input type="password"
            placeholder="Password reveal input"
            password-reveal @focus="hidePassword" @blur="hidePassword" v-model="password">
        </b-input>
      </b-field>
      <input type="range" min="0" max="2" step="0.01" v-model.number="slider">
      {{slider}}
    </section>
  </div>
</template>

<script>
import Tony from './components/Tony.vue'
const debug = require('debug')('tony')

export default {
  name: 'app',
  components: {
    Tony
  },
  data () {
    return {
      slider: 1.1,
      hide: false,
      email: '',
      password: ''
    }
  },
  methods: {
    hidePassword: function (evt) {
      debug('cool')
      this.hide = !this.hide
    },
    focusOnEmail: function (evt) {
      debug('cool')
      this.slider = 1.8 - (this.email.length) * 0.05
    }
  },
  watch: {
    email: function (newVal, oldVal) { // watch it
      debug(this.email, this.email.length)
      this.slider = 1.8 - (this.email.length) * 0.05
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  max-width: 400px;
}
</style>
