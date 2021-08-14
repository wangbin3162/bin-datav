<template>
  <div class="bv-border-box-10" ref="domRef" :style="`box-shadow: inset 0 0 25px 3px ${mergedColor[0]}`">
    <svg class="bv-border-svg-container" :width="width" :height="height">
      <polygon :fill="backgroundColor" :points="`
        4, 0 ${width - 4}, 0 ${width}, 4 ${width}, ${height - 4} ${width - 4}, ${height}
        4, ${height} 0, ${height - 4} 0, 4
      `"/>
    </svg>

    <svg
      width="150px"
      height="150px"
      :key="item"
      v-for="item in border"
      :class="`${item} bv-border-svg-container`"
    >
      <polygon
        :fill="mergedColor[1]"
        points="40, 0 5, 0 0, 5 0, 16 3, 19 3, 7 7, 3 35, 3"
      />
    </svg>

    <div class="border-box-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { userBorderBox } from '../../../hooks'

export default {
  name: 'border10',
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
    const status = userBorderBox(props, ['#1d48c4', '#d3e1f8'])
    return {
      ...status,
      border: ['left-top', 'right-top', 'left-bottom', 'right-bottom'],
    }
  },
}
</script>
