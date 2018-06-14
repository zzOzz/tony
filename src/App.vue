<template>
  <div id="app">
    <input type="range" min="0" max="2" step="0.01" v-model.number="slider">
    <Tony msg="Click" :xfactor="slider"/>
  </div>
</template>

<script>
import Tony from './components/Tony.vue'

export default {
  name: 'app',
  components: {
    Tony
  },
  data () {
    return {
      slider: 1.1
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
}
</style>
