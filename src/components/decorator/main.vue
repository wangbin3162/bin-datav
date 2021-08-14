<template>
  <component
    :is="name"
    :reverse="reverse"
    :dur="dur"
  >
    <slot></slot>
  </component>
</template>

<script>
import decorator1 from './src/decorator1'
import decorator2 from './src/decorator2'

export default {
  name: 'BvDecorator',
  components: {
    decorator1,
    decorator2,
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
      default: 6,
    },
  },
}
</script>
