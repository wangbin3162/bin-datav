<template>
  <div class="bv-decoration-11" ref="domRef">
    <svg :width="width" :height="height">
      <polygon
        :fill="alpha(mergedColor[1] || defaultColor[1], .1)"
        :stroke="mergedColor[1]"
        :points="`20 10, 25 4, 55 4 60 10`"
      />

      <polygon
        :fill="alpha(mergedColor[1] || defaultColor[1], .1)"
        :stroke="mergedColor[1]"
        :points="`20 ${height - 10}, 25 ${height - 4}, 55 ${height - 4} 60 ${height - 10}`"
      />

      <polygon
        :fill="alpha(mergedColor[1] || defaultColor[1], .1)"
        :stroke="mergedColor[1]"
        :points="`${width - 20} 10, ${width - 25} 4, ${width - 55} 4 ${width - 60} 10`"
      />

      <polygon
        :fill="alpha(mergedColor[1] || defaultColor[1], .1)"
        :stroke="mergedColor[1]"
        :points="`${width - 20} ${height - 10}, ${width - 25} ${height - 4}, ${width - 55} ${height - 4} ${width - 60} ${height - 10}`"
      />

      <polygon
        :fill="alpha(mergedColor[0] || defaultColor[0], .2)"
        :stroke="mergedColor[0]"
        :points="`
          20 10, 5 ${height / 2} 20 ${height - 10}
          ${width - 20} ${height - 10} ${width - 5} ${height / 2} ${width - 20} 10
        `"
      />

      <polyline
        fill="transparent"
        :stroke="alpha(mergedColor[0] || defaultColor[0],.7)"
        :points="`25 18, 15 ${height / 2} 25 ${height - 18}`"
      />

      <polyline
        fill="transparent"
        :stroke="alpha(mergedColor[0] || defaultColor[0], .7)"
        :points="`${width - 25} 18, ${width - 15} ${height / 2} ${width - 25} ${height - 18}`"
      />
    </svg>

    <div class="decoration-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { useBorderBox } from '../../../hooks'
import { alpha } from '../../../utils/color'

export default {
  name: 'decorator11',
  props: {
    color: {
      type: Array,
      default: () => ([]),
    },
  },
  setup(props) {
    const status = useBorderBox(props, ['#1a98fc', '#2cf7fe'])
    return {
      ...status,
      alpha,
    }
  },
}
</script>
