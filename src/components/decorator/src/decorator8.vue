<template>
  <div class="bv-decoration-8" ref="domRef">
    <svg :width="width" :height="height">
      <polyline
        :stroke="mergedColor[0]"
        stroke-width="2"
        fill="transparent"
        :points="`${xPos(0)}, 0 ${xPos(30)}, ${height / 2}`"
      />

      <polyline
        :stroke="mergedColor[0]"
        stroke-width="2"
        fill="transparent"
        :points="`${xPos(20)}, 0 ${xPos(50)}, ${height / 2} ${xPos(width)}, ${height / 2}`"
      />

      <polyline
        :stroke="mergedColor[1]"
        fill="transparent"
        stroke-width="3"
        :points="`${xPos(0)}, ${height - 3}, ${xPos(200)}, ${height - 3}`"
      />
    </svg>
  </div>
</template>

<script>
import { useBorderBox } from '../../../hooks'

export default {
  name: 'decorator8',
  props: {
    color: {
      type: Array,
      default: () => ([]),
    },
    reverse: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const status = useBorderBox(props, ['#3f96a5', '#3f96a5'])

    function xPos(pos) {
      if (!props.reverse) return pos
      return status.width.value - pos
    }

    return {
      ...status,
      xPos,
    }
  },
}
</script>
