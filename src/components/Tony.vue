<template>
  <div class="hello">
    <h1 @click='move'>{{ msg }}</h1>
    <div id="tony"/>
  </div>
</template>

<script>
import { TweenMax, TimelineMax } from 'gsap'
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "TonySVGPlugin" }] */
import TonySVGPlugin from '../lib/TonySVGPlugin'
import axios from 'axios'
window.tm = TweenMax
const debug = require('debug')('tony')
const speed = 0.3
let timeline = new TimelineMax()
window.tl = timeline
export default {
  name: 'Tony',
  props: {
    msg: String,
    xfactor: {
      type: Number,
      default: 1
    }
  },
  computed: {
    factor: function () {
      if (this.xfactor !== null) {
        return this.xfactor
      }
      return 1
    }
  },
  watch: {
    xfactor: function (newVal, oldVal) { // watch it
      debug(newVal, oldVal)
      this.move()
    }
  },
  methods: {
    move: function (evt) {
      debug('move', this.factor, evt)
      let logoUdl = document.querySelector('#logo-udl')
      // let bouche = document.querySelector('#big-mouth')
      let boucheOh = document.querySelector('#small-mouth')
      debug('display Oh:', boucheOh.style.mouthType)
      window.TweenMax = TweenMax
      if (boucheOh.style.mouthType !== 'small') {
        TweenMax.to(logoUdl, 1, {rotation: 720, transformOrigin: 'center center'})
        // TweenMax.to('#big-mouth-in', speed, {tonySVG: '#small-mouth-in'})
        // TweenMax.to('#big-mouth-out', speed, {tonySVG: '#small-mouth-out'})
        // TweenMax.to('#face-in', speed, {tonySVG: '#reverse-face-in'})
        TweenMax.to('#right-eye', speed, {x: -5 * this.factor, y: 5 * this.factor, rotation: -20 * this.factor, scaleX: 1, scaleY: 1})
        TweenMax.to('#left-eye', speed, {x: -10 * this.factor, y: 0, rotation: -20 * this.factor, scaleX: 1.2, scaleY: 1.2})
        TweenMax.to('#small-mouth', speed, {x: -5 * this.factor, y: 5 * this.factor, rotation: -20 * this.factor, scaleX: 0.8, scaleY: 0.8})
        TweenMax.to('#nose', speed, {x: -10 * this.factor})
        TweenMax.to('#snout', speed, {x: -10 * this.factor})
        TweenMax.to('#band', speed, {x: -2 * this.factor, rotation: -5 * this.factor})
        TweenMax.to('#full-face', speed, {rotation: -10 * this.factor, x: -5 * this.factor, y: 5 * this.factor})
        TweenMax.to('#mane', speed, {rotation: -5 * this.factor, x: -5 * this.factor, y: 5 * this.factor})
        TweenMax.to('#ears', speed, {rotation: -5 * this.factor, x: 2 * this.factor, y: 5 * this.factor})
        // TweenMax.to('#face-out', speed, {tonySVG: '#reverse-face-out'})
        // boucheOh.style.mouthType = 'small'
      } else {
        TweenMax.to(logoUdl, 1, {rotation: 0, transformOrigin: 'center center'})
        // TweenMax.to('#big-mouth-in', speed, {tonySVG: '#big-mouth-in'})
        // TweenMax.to('#big-mouth-out', speed, {tonySVG: '#big-mouth-out'})
        // TweenMax.to('#face-in', speed, {tonySVG: '#face-in'})
        TweenMax.to('#right-eye', speed, {x: 0, y: 0, rotation: 0, scaleX: 1, scaleY: 1})
        TweenMax.to('#left-eye', speed, {x: 0, y: 0, rotation: 0, scaleX: 1, scaleY: 1})
        TweenMax.to('#small-mouth', speed, {x: 0, y: 0, rotation: 0, scaleX: 1, scaleY: 1})
        TweenMax.to('#nose', speed, {x: 0})
        TweenMax.to('#snout', speed, {x: 0})
        TweenMax.to('#band', speed, {rotation: 0})
        TweenMax.to('#mane', speed, {rotation: 0, x: 0, y: 0})
        TweenMax.to('#ears', speed, {rotation: 0, x: 0, y: 0})
        // TweenMax.to('#face-out', speed, {tonySVG: '#face-out'})
        boucheOh.style.mouthType = 'large'
      }
      // timeline.to(bouche.lastChild, 1, {tonySVG: boucheOh.lastChild}).to(boucheOh.lastChild, 1, {tonySVG: bouche.lastChild})
    }
  },
  mounted () {
    localStorage.debug = 'tony'
    debug('mounted')
    axios.get('/img/tony.svg')
      .then((response) => {
        debug(response)
        let parser = new DOMParser()
        let svg = parser.parseFromString(response.data, 'image/svg+xml')
        document.getElementById('tony').appendChild(svg.getElementsByTagName('svg')[0])
      })
      .catch((err) => {
        debug('error', err)
      })
    let face = document.querySelector('#Calque_1')
    debug('Calque_1:', face)
    // TweenMax.to([mouthBG, mouthOutline, mouthMaskPath], 1, {tonySVG: mouthMediumBG, shapeIndex: 8, ease: Expo.easeOut})
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.tony {
    width: 50vw;
}
</style>
