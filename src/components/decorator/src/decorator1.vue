<template>
  <div class="bv-decoration-1" ref="domRef">
    <svg :width="`${svgWH[0]}px`" :height="`${svgWH[1]}px`" :style="`transform:scale(${svgScale[0]},${svgScale[1]});`">

      <template
        v-for="(point, i) in points"
      >
        <rect
          v-if="Math.random() > 0.6"
          :key="i"
          :fill="mergedColor[0]"
          :x="point[0] - halfPointSideLength"
          :y="point[1] - halfPointSideLength"
          :width="pointSideLength"
          :height="pointSideLength"
        >
          <animate
            v-if="Math.random() > 0.6"
            attributeName="fill"
            :values="`${mergedColor[0]};transparent`"
            dur="1s"
            :begin="Math.random() * 2"
            repeatCount="indefinite"
          />
        </rect>
      </template>

      <rect
        v-if="rects[0]"
        :fill="mergedColor[1]"
        :x="rects[0][0] - pointSideLength"
        :y="rects[0][1] - pointSideLength"
        :width="pointSideLength * 2"
        :height="pointSideLength * 2"
      >
        <animate
          attributeName="width"
          :values="`0;${pointSideLength * 2}`"
          dur="2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="height"
          :values="`0;${pointSideLength * 2}`"
          dur="2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="x"
          :values="`${rects[0][0]};${rects[0][0] - pointSideLength}`"
          dur="2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y"
          :values="`${rects[0][1]};${rects[0][1] - pointSideLength}`"
          dur="2s"
          repeatCount="indefinite"
        />
      </rect>

      <rect
        v-if="rects[1]"
        :fill="mergedColor[1]"
        :x="rects[1][0] - 40"
        :y="rects[1][1] - pointSideLength"
        :width="40"
        :height="pointSideLength * 2"
      >
        <animate
          attributeName="width"
          values="0;40;0"
          dur="2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="x"
          :values="`${rects[1][0]};${rects[1][0] - 40};${rects[1][0]}`"
          dur="2s"
          repeatCount="indefinite"
        />
      </rect>
    </svg>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useBorderBox } from '../../../hooks'

export default {
  name: 'decorator',
  props: {
    color: {
      type: Array,
      default: () => ([]),
    },
  },
  setup(props) {
    const pointSideLength = 2.5
    const status = useBorderBox(props, ['#fff', '#0de7c2'], calcSVGData)
    const data = reactive({
      svgWH: [200, 50],
      svgScale: [1, 1],
      rowNum: 4,
      rowPoints: 20,
      pointSideLength,
      halfPointSideLength: pointSideLength / 2,
      points: [],
      rects: [],
    })


    function calcSVGData() {
      calcPointsPosition()

      calcRectsPosition()

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
    }

    function calcRectsPosition() {
      const { points, rowPoints } = data

      const rect1 = points[rowPoints * 2 - 1]
      const rect2 = points[rowPoints * 2 - 3]

      data.rects = [rect1, rect2]
    }

    function calcScale() {
      const { svgWH } = data
      const { width, height } = status

      const [w, h] = svgWH

      data.svgScale = [width.value / w, height.value / h]
      console.log(data.svgScale)
    }

    return {
      ...status,
      ...toRefs(data),
    }
  },
}
</script>
