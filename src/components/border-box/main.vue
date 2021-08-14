<template>
  <component
    :is="name"
    :color="color"
    :background-color="backgroundColor"
    :reverse="reverse"
    :dur="dur"
    :title-width="titleWidth"
    :title="title"
  >
    <slot></slot>
  </component>
</template>

<script>
import border1 from './src/border1'
import border2 from './src/border2'
import border3 from './src/border3'
import border4 from './src/border4'
import border5 from './src/border5'
import border6 from './src/border6'
import border7 from './src/border7'
import border8 from './src/border8'
import border9 from './src/border9'
import border10 from './src/border10'
import border11 from './src/border11'
import border12 from './src/border12'
import border13 from './src/border13'

export default {
  name: 'BvBorderBox',
  components: {
    border1,
    border2,
    border3,
    border4,
    border5,
    border6,
    border7,
    border8,
    border9,
    border10,
    border11,
    border12,
    border13,
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
    backgroundColor: {
      type: String,
      default: 'transparent',
    },
    reverse: {
      type: Boolean,
      default: false,
    },
    dur: {
      type: Number,
      default: 3,
    },
    titleWidth: {
      type: Number,
      default: 250,
    },
    title: {
      type: String,
      default: '',
    },
  },
}
</script>
