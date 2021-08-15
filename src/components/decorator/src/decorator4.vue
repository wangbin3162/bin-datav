<template>
  <div class="bv-decoration-4" ref="domRef">
    <div
      class="container reverse"
      :style="`width:${width}px;height:5px;animation-duration:${dur}s`"
    >
      <svg :width="width" :height="5">
        <polyline
          :stroke="mergedColor[0]"
          :points="`0, 2.5 ${width}, 2.5`"
        />
        <polyline
          class="bold-line"
          :stroke="mergedColor[1]"
          stroke-width="3"
          stroke-dasharray="20, 80"
          stroke-dashoffset="-30"
          :points="`0, 2.5 ${width}, 2.5`"
        />
      </svg>
    </div>
  </div>
</template>

<script>
import { useBorderBox } from '../../../hooks'

export default {
  name: 'decorator4',
  props: {
    color: {
      type: Array,
      default: () => ([]),
    },
    dur: {
      type: Number,
      default: 3,
    },
  },
  setup(props) {
    const status = useBorderBox(props, ['rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.3)'])

    return {
      ...status,
    }
  },
}
</script>
