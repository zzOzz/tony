<template>
  <div id="app">
    <Tony msg="Click"/>
  </div>
</template>

<script>
import Tony from './components/Tony.vue'

export default {
  name: 'app',
  components: {
    Tony
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
