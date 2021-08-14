<template>
  <div
    class="bv-border-box-7"
    :style="`box-shadow: inset 0 0 40px ${mergedColor[0]}; border: 1px solid ${mergedColor[0]}; background-color: ${backgroundColor}`"
    ref="domRef"
  >
    <svg class="bv-border-svg-container" :width="width" :height="height">
      <polyline class="bv-bb7-line-width-2" :stroke="mergedColor[0]" :points="`0, 25 0, 0 25, 0`"/>
      <polyline class="bv-bb7-line-width-2" :stroke="mergedColor[0]"
                :points="`${width - 25}, 0 ${width}, 0 ${width}, 25`"/>
      <polyline class="bv-bb7-line-width-2" :stroke="mergedColor[0]"
                :points="`${width - 25}, ${height} ${width}, ${height} ${width}, ${height - 25}`"/>
      <polyline class="bv-bb7-line-width-2" :stroke="mergedColor[0]"
                :points="`0, ${height - 25} 0, ${height} 25, ${height}`"/>

      <polyline class="bv-bb7-line-width-5" :stroke="mergedColor[1]" :points="`0, 10 0, 0 10, 0`"/>
      <polyline class="bv-bb7-line-width-5" :stroke="mergedColor[1]"
                :points="`${width - 10}, 0 ${width}, 0 ${width}, 10`"/>
      <polyline class="bv-bb7-line-width-5" :stroke="mergedColor[1]"
                :points="`${width - 10}, ${height} ${width}, ${height} ${width}, ${height - 10}`"/>
      <polyline class="bv-bb7-line-width-5" :stroke="mergedColor[1]"
                :points="`0, ${height - 10} 0, ${height} 10, ${height}`"/>
    </svg>

    <div class="border-box-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { userBorderBox } from '../../../hooks'

export default {
  name: 'border7',
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
    const status = userBorderBox(props, ['#3140ad', '#1089ff'])
    return {
      ...status,
      border: ['left-top', 'right-top', 'left-bottom', 'right-bottom'],
    }
  },
}
</script>
