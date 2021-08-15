<template>
  <div class="bv-decoration-6" ref="domRef">
    <svg :width="`${svgWH[0]}px`" :height="`${svgWH[1]}px`" :style="`transform:scale(${svgScale[0]},${svgScale[1]});`">
      <template
        v-for="(point, i) in points"
        :key="i"
      >
        <rect
          :fill="mergedColor[Math.random() > 0.5 ? 0 : 1]"
          :x="point[0] - halfRectWidth"
          :y="point[1] - heights[i] / 2"
          :width="rectWidth"
          :height="heights[i]"
        >
          <animate
            attributeName="y"
            :values="`${point[1] - minHeights[i] / 2};${point[1] - heights[i] / 2};${point[1] - minHeights[i] / 2}`"
            :dur="`${randoms[i]}s`"
            keyTimes="0;0.5;1"
            calcMode="spline"
            keySplines="0.42,0,0.58,1;0.42,0,0.58,1"
            begin="0s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="height"
            :values="`${minHeights[i]};${heights[i]};${minHeights[i]}`"
            :dur="`${randoms[i]}s`"
            keyTimes="0;0.5;1"
            calcMode="spline"
            keySplines="0.42,0,0.58,1;0.42,0,0.58,1"
            begin="0s"
            repeatCount="indefinite"
          />
        </rect>
      </template>
    </svg>
  </div>
</template>

<script>
import { useBorderBox } from '../../../hooks'
import { reactive, toRefs } from 'vue'
import { randomExtend } from '../../../utils/util'

export default {
  name: 'decorator6',
  props: {
    color: {
      type: Array,
      default: () => ([]),
    },
  },
  setup(props) {
    const rectWidth = 7
    const status = useBorderBox(props, ['#7acaec', '#7acaec'], calcSVGData)
    const data = reactive({
      svgWH: [300, 35],
      svgScale: [1, 1],
      rowNum: 1,
      rowPoints: 40,
      rectWidth,
      halfRectWidth: rectWidth / 2,
      points: [],
      heights: [],
      minHeights: [],
      randoms: [],
    })

    function calcSVGData() {
      calcPointsPosition()
      calcScale()
    }

    function calcPointsPosition() {
      const { svgWH, rowNum, rowPoints } = data

      const [w, h] = svgWH

      const horizontalGap = w / (rowPoints + 1)
      const verticalGap = h / (rowNum + 1)

      let points = new Array(rowNum).fill(0).map((foo, i) =>
        new Array(rowPoints).fill(0).map((foo, j) => [
          horizontalGap * (j + 1), verticalGap * (i + 1),
        ]))

      data.points = points.reduce((all, item) => [...all, ...item], [])
      const heights = data.heights = new Array(rowNum * rowPoints)
        .fill(0).map(foo =>
          Math.random() > 0.8 ? randomExtend(0.7 * h, h) : randomExtend(0.2 * h, 0.5 * h))

      data.minHeights = new Array(rowNum * rowPoints)
        .fill(0).map((foo, i) => heights[i] * Math.random())

      data.randoms = new Array(rowNum * rowPoints)
        .fill(0).map(foo => Math.random() + 1.5)
    }

    function calcScale() {
      const [w, h] = data.svgWH
      const width = status.width.value
      const height = status.height.value

      data.svgScale = [width / w, height / h]
    }

    return {
      ...status,
      ...toRefs(data),
    }
  },
}
</script>
