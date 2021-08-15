<template>
  <div class="bv-decoration-2" ref="domRef">
    <svg :width="`${width}px`" :height="`${height}px`">
      <rect :x="x" :y="y" :width="w" :height="h" :fill="mergedColor[0]">
        <animate
          attributeName="width"
          from="0"
          :to="width"
          :dur="`${dur}s`"
          calcMode="spline"
          keyTimes="0;1"
          keySplines=".42,0,.58,1"
          repeatCount="indefinite"
        />
      </rect>

      <rect :x="x" :y="y" width="1" height="1" :fill="mergedColor[1]">
        <animate
          attributeName="x"
          from="0"
          :to="width"
          :dur="`${dur}s`"
          calcMode="spline"
          keyTimes="0;1"
          keySplines="0.42,0,0.58,1"
          repeatCount="indefinite"
        />
      </rect>
    </svg>
  </div>
</template>

<script>
import { useBorderBox } from '../../../hooks'
import { reactive, toRefs } from 'vue'

export default {
  name: 'decorator2',
  props: {
    color: {
      type: Array,
      default: () => ([]),
    },
    dur: {
      type: Number,
      default: 6,
    },
  },
  setup(props) {
    const status = useBorderBox(props, ['#3faacb', '#fff'], calcSVGData)
    const data = reactive({
      x: 0,
      y: 0,

      w: 0,
      h: 0,
    })

    function calcSVGData() {
      const width = status.width.value
      const height = status.height.value

      data.w = +width
      data.h = 1
      data.x = 0
      data.y = height / 2
    }

    return {
      ...status,
      ...toRefs(data),
    }
  },
}
</script>
