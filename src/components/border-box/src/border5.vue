<template>
  <div class="bv-border-box-5" ref="domRef">
    <svg class="bv-border-svg-container" :width="width" :height="height">
      <polygon :fill="backgroundColor" :points="`
        10, 22 ${width - 22}, 22 ${width - 22}, ${height - 86} ${width - 84}, ${height - 24} 10, ${height - 24}
      `"/>

      <polyline
        class="bv-bb5-line-1"
        :stroke="mergedColor[0]"
        :points="`8, 5 ${width - 5}, 5 ${width - 5}, ${height - 100}
          ${width - 100}, ${height - 5} 8, ${height - 5} 8, 5`"
      />
      <polyline
        class="bv-bb5-line-2"
        :stroke="mergedColor[1]"
        :points="`3, 5 ${width - 20}, 5 ${width - 20}, ${height - 60}
          ${width - 74}, ${height - 5} 3, ${height - 5} 3, 5`"
      />
      <polyline class="bv-bb5-line-3" :stroke="mergedColor[1]" :points="`50, 13 ${width - 35}, 13`"/>
      <polyline class="bv-bb5-line-4" :stroke="mergedColor[1]" :points="`15, 20 ${width - 35}, 20`"/>
      <polyline class="bv-bb5-line-5" :stroke="mergedColor[1]"
                :points="`15, ${height - 20} ${width - 110}, ${height - 20}`"/>
      <polyline class="bv-bb5-line-6" :stroke="mergedColor[1]"
                :points="`15, ${height - 13} ${width - 110}, ${height - 13}`"/>
    </svg>

    <div class="border-box-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { useBorderBox } from '../../../hooks'

export default {
  name: 'border5',
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
    const status = useBorderBox(props, ['#1089ff', '#0b60b3'])
    return {
      ...status,
    }
  },
}
</script>
