<template>
    <!-- <h1 @click='move'>{{ msg }}</h1>
    <button @click='hideEyes'>#hide {{ msg }}</button>
    <button @click='showEyes'>#show {{ msg }}</button> -->
    <!-- <div id="tony"/> -->
    <div id="tony" @click='move'>
      <!-- <svg :src="require('../../public/img/tony.svg')"/> -->
    </div>
</template>

<script>
import { TweenMax, TimelineMax, Expo, Elastic, Bounce } from 'gsap'
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "TonySVGPlugin" }] */
import TonySVGPlugin from '../lib/TonySVGPlugin'
import axios from 'axios'
window.tm = TweenMax
const debug = require('debug')('tony')
const speed = 0.3
// const armOrigin = '10% 10% 30%'
// const armRotation = '90'
let timeline = new TimelineMax({
  repeat: 0,
  yoyo: true,
  onComplete: function () {
    console.log('complete')
    this.restart()
  }
})
window.tl = timeline
export default {
  name: 'Tony',
  props: {
    svgURL: String,
    hide: {
      type: Boolean,
      default: false
    },
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
    },
    hide: function () {
      if (this.hide) {
        this.hideEyes()
      } else {
        this.showEyes()
      }
    }
  },
  methods: {
    smallMoves: function () {
      // TweenMax.to('#left-arm', speed * 2, {x: 0, y: 0, rotation: 10, scaleX: 1, scaleY: 1, scaleZ: 1, transformOrigin: 'center center', ease: Expo.easeOut})
      timeline.to('#left-hand', speed * 4, {rotation: 30, x: -10, transformOrigin: 'center center', ease: Elastic.easeIn.config(1, 0.75)})
        .to('#tony-body', speed * 3, {x: 0, y: 0, rotation: 0, scaleX: 1.05, scaleY: 1.05, scaleZ: 1, transformOrigin: 'center center', ease: Bounce.easeOut}, -1)
        .to('#tony-body', speed * 2, {x: 0, y: 0, rotation: -5, scaleX: 1, scaleY: 1, scaleZ: 1, transformOrigin: 'center center', ease: Expo.easeOut})
        .to('#tony-body', speed * 2, {x: 0, y: 0, rotation: 0, scaleX: 1, scaleY: 1, scaleZ: 1, transformOrigin: 'center center', ease: Expo.easeOut})
        .to('#left-hand', speed * 4, {rotation: 0, x: 0, transformOrigin: 'center center', ease: Elastic.easeIn.config(1, 0.75)})
    },
    openArms: function () {
      TweenMax.to('#left-arm', 1, {tonySVG: '#left-arm', shapeIndex: 9, ease: Expo.easeOut})
      TweenMax.to('#right-arm', 1, {tonySVG: '#right-arm', shapeIndex: 9, ease: Expo.easeOut})
      TweenMax.to('#left-hand', speed, {x: 0, y: 0, rotation: 0, scaleX: 1, scaleY: 1})
      TweenMax.to('#right-hand', speed, {x: 0, y: 0, rotation: 0, scaleX: 1, scaleY: 1})
    },
    closeArms: function () {
      TweenMax.to('#left-arm', 1, {tonySVG: '#left-arm-hide', shapeIndex: 9, ease: Expo.easeOut})
      TweenMax.to('#right-arm', 1, {tonySVG: '#right-arm-hide', shapeIndex: 9, ease: Expo.easeOut})
      TweenMax.to('#left-hand', speed * 2, {x: -15, y: 15, rotation: 40, scaleX: 1, scaleY: 1, transformOrigin: 'center center'})
      TweenMax.to('#right-hand', speed * 2, {x: 35, y: 30, rotation: -80, scaleX: 1, scaleY: 1})
    },
    hideEyes: function (evt) {
      debug('hide', evt)
      this.openArms()
      TweenMax.to('#band', speed, {x: -2 * this.factor, y: 23, rotation: -5 * this.factor, ease: Bounce.easeOut, scaleY: 2, scaleX: 1.1})
      // TweenMax.to('#left-arm', 1, {rotationZ: armRotation, transformOrigin: armOrigin})
    },
    showEyes: function (evt) {
      debug('hide', evt)
      this.closeArms()
      TweenMax.to('#band', speed * 3, {x: 0, y: 0, rotation: 0, scaleX: 1, scaleY: 1, ease: Elastic.easeOut})
      // TweenMax.to('#left-arm', 1, {rotationZ: 0, transformOrigin: armOrigin})
    },
    move: function (evt) {
      debug('move', this.factor, evt)
      let logoUdl = document.querySelector('#logo-udl')
      // let bouche = document.querySelector('#big-mouth')
      let boucheOh = document.querySelector('#small-mouth')
      debug('display Oh:', boucheOh.style.mouthType)
      // window.TweenMax = TweenMax
      if (boucheOh.style.rotateLogo !== true) {
        boucheOh.style.rotateLogo = true
        TweenMax.to(logoUdl, 1, {rotation: 720, transformOrigin: 'center center'})
      } else {
        boucheOh.style.rotateLogo = false
        TweenMax.to(logoUdl, 1, {rotation: 0, transformOrigin: 'center center'})
      }
      if (boucheOh.style.mouthType !== 'small') {
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
    // localStorage.debug = 'tony'
    debug('mounted')
    // axios.get('/img/tony.svg')
    axios.get(this.svgURL)
      .then((response) => {
        debug(response)
        let parser = new DOMParser()
        let svg = parser.parseFromString(response.data, 'image/svg+xml')
        // debug(svg.getElementsByTagName('svg'))
        document.getElementById('tony').appendChild(svg.getElementsByTagName('svg')[0])
        this.closeArms()
        this.smallMoves()
        // TweenMax.to('#Calque_1', speed, {rotation: 0, x: 0, y: 0, scaleX: 2, scaleY: 2})
        TweenMax.to('#Calque_1', 1.5, { attr: { viewBox: '0 0 400 400' }, scaleX: 1, scaleY: 1 })
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
#tony {
  /* width: 50vw; */
}
</style>
