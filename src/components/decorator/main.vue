<template>
  <component
    :is="name"
    :reverse="reverse"
    :dur="dur"
    :scan-dur="scanDur"
    :halo-dur="haloDur"
  >
    <slot></slot>
  </component>
</template>

<script>
import decorator1 from './src/decorator1'
import decorator2 from './src/decorator2'
import decorator3 from './src/decorator3'
import decorator4 from './src/decorator4'
import decorator5 from './src/decorator5'
import decorator6 from './src/decorator6'
import decorator7 from './src/decorator7'
import decorator8 from './src/decorator8'
import decorator9 from './src/decorator9'
import decorator10 from './src/decorator10'
import decorator11 from './src/decorator11'
import decorator12 from './src/decorator12'

export default {
  name: 'BvDecorator',
  components: {
    decorator1,
    decorator2,
    decorator3,
    decorator4,
    decorator5,
    decorator6,
    decorator7,
    decorator8,
    decorator9,
    decorator10,
    decorator11,
    decorator12,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    color: {
      type: Array,
      default: () => ([]),
    },
    reverse: {
      type: Boolean,
      default: false,
    },
    dur: {
      type: Number,
      default: 3,
    },
    scanDur: {
      type: Number,
      default: 3,
    },
    haloDur: {
      type: Number,
      default: 2,
    },
  },
}
</script>
