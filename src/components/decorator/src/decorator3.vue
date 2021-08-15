<template>
  <div class="bv-decoration-3" ref="domRef">
    <svg :width="`${svgWH[0]}px`" :height="`${svgWH[1]}px`" :style="`transform:scale(${svgScale[0]},${svgScale[1]});`">

      <template
        v-for="(point, i) in points"
        :key="i"
      >
        <rect
          :fill="mergedColor[0]"
          :x="point[0] - halfPointSideLength"
          :y="point[1] - halfPointSideLength"
          :width="pointSideLength"
          :height="pointSideLength"
        >
          <animate
            v-if="Math.random() > 0.6"
            attributeName="fill"
            :values="`${mergedColor.join(';')}`"
            :dur="Math.random() + 1 + 's'"
            :begin="Math.random() * 2"
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

export default {
  name: 'decorator3',
  props: {
    color: {
      type: Array,
      default: () => ([]),
    },
  },
  setup(props) {
    const pointSideLength = 7
    const status = useBorderBox(props, ['#7acaec', 'transparent'], calcSVGData)
    const data = reactive({
      svgWH: [300, 35],
      svgScale: [1, 1],
      rowNum: 2,
      rowPoints: 25,
      pointSideLength,
      halfPointSideLength: pointSideLength / 2,
      points: [],
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

