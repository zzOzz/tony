<template>
  <div id="app" class="card container">
    <Tony :svgURL="svgURL" :xfactor="slider" :hide="hide" class="card-image"/>
    <section class="card-content">
      <b-field>
      <b-autocomplete
        ref="emailInput"
        rounded
        v-model="email"
        :data="filteredDataArray"
        placeholder="email"
        size="is-medium"
        icon="email" @focus="focusOnEmail"
        @select="chooseDomain"
        >
        <template slot="empty">No results found</template>
      </b-autocomplete>
      </b-field>
      <!-- <b-field>
        <b-input placeholder="Email" rounded
            size="is-medium"
            type="email"
            icon="email" v-model="email" @focus="focusOnEmail" >
        </b-input>
      </b-field> -->
      <b-field>
        <b-input type="password" rounded
            size="is-medium"
            placeholder="Password reveal input"
            password-reveal @focus="hidePassword" @blur="hidePassword" v-model="password">
        </b-input>
      </b-field>
      <div v-if='false'>
      <input type="range" min="0" max="2" step="0.01" v-model.number="slider">
      {{slider}}
      </div>
    </section>
  </div>
</template>

<script>
import Tony from './components/Tony.vue'
import Buefy from 'buefy'
const debug = require('debug')('tony')
let config = {
  svgURL: '/img/tony.svg'
}
const setOptions = (options) => { config = options }
export default {
  install: (Vue, options = {}) => {
    // Options
    setOptions(options)
    debug('install', options, config)
    Vue.use(Buefy, { defaultIconPack: 'mdi' })
  },
  name: 'tony-login',
  components: {
    Tony
  },
  data () {
    return {
      slider: 1.1,
      hide: false,
      email: '',
      password: '',
      selected: ''
    }
  },
  props: {
    mailDomains: {
      type: Array,
      default: () => [
        'universite-lyon.fr',
        'persee.fr'
      ]
    },
    value: {
      type: Object,
      default: () => {
        return {
          email: '',
          password: ''
        }
      }
    }
  },
  computed: {
    svgURL () {
      return config.svgURL
    },
    filteredDataArray () {
      let returnedArray = []
      this.mailDomains.forEach((domain) => {
        returnedArray.push(this.email.split('@')[0] + '@' + domain)
      })
      return returnedArray
      // return this.mailDomains.filter((option) => {
      //   return option
      //     .toString()
      //     .toLowerCase()
      //     .indexOf(this.email.toLowerCase()) >= 0
      // })
    }
  },
  methods: {
    chooseDomain: function (email) {
      debug('chooseDomain:', this.$refs.emailInput, email)
      this.email = email + ' '
    },
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
      this.$emit('input', { email: this.email, password: this.password })
    },
    password: function (newVal, oldVal) { // watch it
      this.$emit('input', { email: this.email, password: this.password })
    }
  }
}
</script>

<style lang="scss">
// Import Bulma's core
@import "~bulma/sass/utilities/_all";

// Set your colors
$primary: rgb(225, 228, 78);
$primary-invert: findColorInvert($primary);
$twitter: #4099FF;
$twitter-invert: findColorInvert($twitter);

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: (
    "white": ($white, $black),
    "black": ($black, $white),
    "light": ($light, $light-invert),
    "dark": ($dark, $dark-invert),
    "primary": ($primary, $primary-invert),
    "info": ($info, $info-invert),
    "success": ($success, $success-invert),
    "warning": ($warning, $warning-invert),
    "danger": ($danger, $danger-invert),
    "twitter": ($twitter, $twitter-invert)
);

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";
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
