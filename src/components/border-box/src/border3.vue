<template>
  <div class="bv-border-box-3" ref="domRef">
    <svg class="bv-border-svg-container" :width="width" :height="height">
      <polygon :fill="backgroundColor" :points="`
        23, 23 ${width - 24}, 23 ${width - 24}, ${height - 24} 23, ${height - 24}
      `"/>

      <polyline class="bv-bb3-line1"
                :stroke="mergedColor[0]"
                :points="`4, 4 ${width - 22} ,4 ${width - 22}, ${height - 22} 4, ${height - 22} 4, 4`"
      />
      <polyline class="bv-bb3-line2"
                :stroke="mergedColor[1]"
                :points="`10, 10 ${width - 16}, 10 ${width - 16}, ${height - 16} 10, ${height - 16} 10, 10`"
      />
      <polyline class="bv-bb3-line2"
                :stroke="mergedColor[1]"
                :points="`16, 16 ${width - 10}, 16 ${width - 10}, ${height - 10} 16, ${height - 10} 16, 16`"
      />
      <polyline class="bv-bb3-line2"
                :stroke="mergedColor[1]"
                :points="`22, 22 ${width - 4}, 22 ${width - 4}, ${height - 4} 22, ${height - 4} 22, 22`"
      />
    </svg>

    <div class="border-box-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { useBorderBox } from '../../../hooks'

export default {
  name: 'border3',
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
    const status = useBorderBox(props, ['#2862b7', '#2862b7'])
    return {
      ...status,
    }
  },
}
</script>
