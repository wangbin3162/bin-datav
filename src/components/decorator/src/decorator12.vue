<template>
  <div class="bv-decoration-12" ref="domRef">
    <svg :width="width" :height="height">
      <defs>
        <g :id="gId">
          <path
            :stroke="pathColor[i]"
            :stroke-width="width / 2"
            fill="transparent"
            v-for="(d, i) in pathD"
            :key="d"
            :d="d"
          />
        </g>

        <radialGradient
          :id="gradientId"
          cx="50%" cy="50%" r="50%"
        >
          <stop offset="0%" stop-color="transparent" stop-opacity="1"/>
          <stop offset="100%" :stop-color="alpha(mergedColor[1] || defaultColor[1], .3)" stop-opacity="1"/>
        </radialGradient>
      </defs>

      <circle
        v-for="r in circleR"
        :key="r"
        :r="r"
        :cx="x"
        :cy="y"
        :stroke="mergedColor[1]"
        :stroke-width="0.5"
        fill="transparent"
      />

      <circle
        r="1"
        :cx="x"
        :cy="y"
        stroke="transparent"
        :fill="`url(#${gradientId})`"
      >
        <animate
          attributeName="r"
          :values="`1;${width / 2}`"
          :dur="`${haloDur}s`"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="1;0"
          :dur="`${haloDur}s`"
          repeatCount="indefinite"
        />
      </circle>

      <circle
        r="2"
        :cx="x"
        :cy="y"
        :fill="mergedColor[1]"
      />

      <g v-if="showSplitLine">
        <polyline
          v-for="p in splitLinePoints"
          :key="p"
          :points="p"
          :stroke="mergedColor[1]"
          :stroke-width="0.5"
          opacity="0.5"
        />
      </g>

      <path
        v-for="d in arcD"
        :key="d"
        :d="d"
        :stroke="mergedColor[1]"
        stroke-width="2"
        fill="transparent"
      />

      <use :xlink:href="`#${gId}`">
        <animateTransform
          attributeName="transform"
          type="rotate"
          :values="`0, ${x} ${y};360, ${x} ${y}`"
          :dur="`${scanDur}s`"
          repeatCount="indefinite"
        />
      </use>
    </svg>

    <div class="decoration-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { generateId, getCircleRadianPoint } from '../../../utils/util'
import { useBorderBox } from '../../../hooks'
import { computed, reactive, toRefs } from 'vue'
import { alpha } from '../../../utils/color'

export default {
  name: 'decorator12',
  props: {
    color: {
      type: Array,
      default: () => ([]),
    },
    scanDur: {
      type: Number,
      default: 3,
    },
    haloDur: {
      type: Number,
      default: 2,
    },
  },
  setup(props) {
    const id = generateId()
    const status = useBorderBox(props, ['#2783ce', '#2cf7fe'], init)
    const data = reactive({
      gId: `decoration-12-g-${id}`,
      gradientId: `decoration-12-gradient-${id}`,
      pathD: [],
      pathColor: [],
      circleR: [],
      splitLinePoints: [],
      arcD: [],
      segment: 30,
      sectorAngle: Math.PI / 3,
      ringNum: 3,
      ringWidth: 1,
      showSplitLine: true,
    })

    const x = computed(() => status.width.value / 2)
    const y = computed(() => status.height.value / 2)

    function init() {
      calcPathD()
      calcPathColor()
      calcCircleR()
      calcSplitLinePoints()
      calcArcD()
    }

    function calcPathD() {
      const { segment, sectorAngle } = data
      const width = status.width.value

      const startAngle = -Math.PI / 2
      const angleGap = sectorAngle / segment
      const r = width / 4
      let lastEndPoints = getCircleRadianPoint(x.value, y.value, r, startAngle)

      data.pathD = new Array(segment)
        .fill('')
        .map((_, i) => {
          const endPoints = getCircleRadianPoint(x.value, y.value, r, startAngle - (i + 1) * angleGap).map(_ => _.toFixed(5))
          const d = `M${lastEndPoints.join(',')} A${r}, ${r} 0 0 0 ${endPoints.join(',')}`
          lastEndPoints = endPoints

          return d
        })
    }

    function calcPathColor() {
      const { segment } = data

      const colorGap = 100 / (segment - 1)
      const [color] = status.mergedColor.value

      data.pathColor = new Array(segment)
        .fill(color)
        .map((_, i) => alpha(color, (100 - i * colorGap) / 100))
    }

    function calcCircleR() {
      const { ringNum, ringWidth } = data

      const radiusGap = (x.value - ringWidth / 2) / ringNum

      data.circleR = new Array(ringNum)
        .fill(0)
        .map((_, i) => radiusGap * (i + 1))
    }

    function calcSplitLinePoints() {
      const width = status.width.value
      const _x = x.value
      const _y = y.value

      const angleGap = Math.PI / 6
      const r = width / 2

      data.splitLinePoints = new Array(6)
        .fill('')
        .map((_, i) => {
          const startAngle = angleGap * (i + 1)
          const endAngle = startAngle + Math.PI
          const startPoint = getCircleRadianPoint(_x, _y, r, startAngle)
          const endPoint = getCircleRadianPoint(_x, _y, r, endAngle)

          return `${startPoint.join(',')} ${endPoint.join(',')}`
        })
    }

    function calcArcD() {
      const width = status.width.value
      const _x = x.value
      const _y = y.value

      const angleGap = Math.PI / 6
      const r = width / 2 - 1

      data.arcD = new Array(4)
        .fill('')
        .map((_, i) => {
          const startAngle = angleGap * (3 * i + 1)
          const endAngle = startAngle + angleGap
          const startPoint = getCircleRadianPoint(_x, _y, r, startAngle)
          const endPoint = getCircleRadianPoint(_x, _y, r, endAngle)

          return `M${startPoint.join(',')} A${_x}, ${_y} 0 0 1 ${endPoint.join(',')}`
        })
    }

    return {
      ...status,
      ...toRefs(data),
      x,
      y,
      alpha,
    }
  },
}
</script>
