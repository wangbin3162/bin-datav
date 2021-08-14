<template>
  <div class="bv-border-box-6" ref="domRef">
    <svg class="bv-border-svg-container" :width="width" :height="height">
      <polygon :fill="backgroundColor" :points="`
        9, 7 ${width - 9}, 7 ${width - 9}, ${height - 7} 9, ${height - 7}
      `"/>

      <circle :fill="mergedColor[1]" cx="5" cy="5" r="2"/>
      <circle :fill="mergedColor[1]" :cx="width - 5" cy="5" r="2"/>
      <circle :fill="mergedColor[1]" :cx="width - 5" :cy="height - 5" r="2"/>
      <circle :fill="mergedColor[1]" cx="5" :cy="height - 5" r="2"/>
      <polyline :stroke="mergedColor[0]" :points="`10, 4 ${width - 10}, 4`"/>
      <polyline :stroke="mergedColor[0]" :points="`10, ${height - 4} ${width - 10}, ${height - 4}`"/>
      <polyline :stroke="mergedColor[0]" :points="`5, 70 5, ${height - 70}`"/>
      <polyline :stroke="mergedColor[0]" :points="`${width - 5}, 70 ${width - 5}, ${height - 70}`"/>
      <polyline :stroke="mergedColor[0]" :points="`3, 10, 3, 50`"/>
      <polyline :stroke="mergedColor[0]" :points="`7, 30 7, 80`"/>
      <polyline :stroke="mergedColor[0]" :points="`${width - 3}, 10 ${width - 3}, 50`"/>
      <polyline :stroke="mergedColor[0]" :points="`${width - 7}, 30 ${width - 7}, 80`"/>
      <polyline :stroke="mergedColor[0]" :points="`3, ${height - 10} 3, ${height - 50}`"/>
      <polyline :stroke="mergedColor[0]" :points="`7, ${height - 30} 7, ${height - 80}`"/>
      <polyline :stroke="mergedColor[0]" :points="`${width - 3}, ${height - 10} ${width - 3}, ${height - 50}`"/>
      <polyline :stroke="mergedColor[0]" :points="`${width - 7}, ${height - 30} ${width - 7}, ${height - 80}`"/>
    </svg>

    <div class="border-box-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { userBorderBox } from '../../../hooks'

export default {
  name: 'border6',
  props: {
    color: {
      type: Array,
      default: () => ([]),
    },
    backgroundColor: {
      type: String,
      default: 'transparent',
    },
  },
  setup(props) {
    const status = userBorderBox(props, ['#3140ad', '#235fa7'])
    return {
      ...status,
    }
  },
}
</script>
