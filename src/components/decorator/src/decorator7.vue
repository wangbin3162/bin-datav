<template>
  <div class="bv-decoration-7" ref="domRef">
    <svg width="21px" height="20px">
      <polyline
        stroke-width="4"
        fill="transparent"
        :stroke="mergedColor[0]"
        points="10, 0 19, 10 10, 20"
      />
      <polyline
        stroke-width="2"
        fill="transparent"
        :stroke="mergedColor[1]"
        points="2, 0 11, 10 2, 20"
      />
    </svg>
    <span><slot></slot></span>
    <svg width="21px" height="20px">
      <polyline
        stroke-width="4"
        fill="transparent"
        :stroke="mergedColor[0]"
        points="11, 0 2, 10 11, 20"
      />
      <polyline
        stroke-width="2"
        fill="transparent"
        :stroke="mergedColor[1]"
        points="19, 0 10, 10 19, 20"
      />
    </svg>
  </div>
</template>

<script>
import { useBorderBox } from '../../../hooks'

export default {
  name: 'decorator7',
  props: {
    color: {
      type: Array,
      default: () => ([]),
    },
  },
  setup(props) {
    const status = useBorderBox(props, ['#1dc1f5', '#1dc1f5'])
    return {
      ...status,
    }
  },
}
</script>
