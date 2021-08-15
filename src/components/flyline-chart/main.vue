<template>
  <div
    class="bv-flyline-chart"
    :style="`background-image: url(${mergedConfig ? mergedConfig.bgImgSrc : ''})`"
    ref="domRef"
    @click="consoleClickPos"
  >
    <svg v-if="flylines.length" :width="width" :height="height">
      <defs>
        <radialGradient :id="flylineGradientId" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#fff" stop-opacity="1"/>
          <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
        </radialGradient>
        <radialGradient :id="haloGradientId" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#fff" stop-opacity="0"/>
          <stop offset="100%" stop-color="#fff" stop-opacity="1"/>
        </radialGradient>
      </defs>
      <!-- points -->
      <g
        v-for="point in flylinePoints"
        class="point-item"
        :key="point.key + Math.random()"
        @click="handlePointClick(point)"
      >
        <defs>
          <circle
            v-if="point.halo.show"
            :id="`halo${unique}${point.key}`"
            :cx="point.coordinate[0]"
            :cy="point.coordinate[1]"
            r="50%"
          >
            <animate
              attributeName="r"
              :values="`1;${point.halo.radius}`"
              :dur="`${point.halo.time}s`"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="1;0"
              :dur="`${point.halo.time}s`"
              repeatCount="indefinite"
            />
          </circle>
        </defs>

        <!-- halo gradient mask -->
        <mask :id="`mask${unique}${point.key}`">
          <use
            v-if="point.halo.show"
            :xlink:href="`#halo${unique}${point.key}`"
            :fill="`url(#${haloGradientId})`"
          />
        </mask>

        <!-- point halo -->
        <use
          v-if="point.halo.show"
          :xlink:href="`#halo${unique}${point.key}`"
          :fill="point.halo.color"
          :mask="`url(#mask${unique}${point.key})`"
        />

        <!-- point icon -->
        <image
          v-if="point.icon.show"
          :xlink:href="point.icon.src"
          :width="point.icon.width"
          :height="point.icon.height"
          :x="point.icon.x"
          :y="point.icon.y"
        />

        <!-- point text -->
        <text
          v-if="point.text.show"
          :style="`font-size:${point.text.fontSize}px;color:${point.text.color}`"
          :fill="point.text.color"
          :x="point.text.x"
          :y="point.text.y"
        >
          {{ point.name }}
        </text>
      </g>
      <!-- flylines -->
      <g v-for="(line, i) in flylines" :key="line.key + Math.random()">
        <defs>
          <path :id="line.key" :d="line.d" fill="transparent"/>
        </defs>
        <!-- orbit line -->
        <use :xlink:href="`#${line.key}`" :stroke-width="line.width" :stroke="line.orbitColor"/>
        <!-- fly line gradient mask -->
        <mask :id="`mask${unique}${line.key}`">
          <circle cx="0" cy="0" :r="line.radius" :fill="`url(#${flylineGradientId})`">
            <animateMotion :dur="line.time" :path="line.d" rotate="auto" repeatCount="indefinite"/>
          </circle>
        </mask>
        <!-- fly line -->
        <use
          v-if="flylineLengths[i]"
          :xlink:href="`#${line.key}`"
          :stroke-width="line.width"
          :stroke="line.color"
          :mask="`url(#mask${unique}${line.key})`"
        >
          <animate
            attributeName="stroke-dasharray"
            :from="`0, ${flylineLengths[i]}`"
            :to="`${flylineLengths[i]}, 0`"
            :dur="line.time"
            repeatCount="indefinite"
          />
        </use>
      </g>
    </svg>
  </div>
</template>

<script>
import { nextTick, reactive, ref, toRefs, watch } from 'vue'
import useAutoResize from '../../hooks/useAutoResize'
import { deepCopy, deepMerge, generateId, randomExtend, getTwoPointDistance } from '../../utils/util'

export default {
  name: 'BvFlylineChart',
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
    dev: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['click'],
  setup(props, { emit }) {
    const id = generateId()
    const defaultConfig = ref({
      /**
       * @description Flyline chart points
       * @type {Point[]}
       * @default points = []
       */
      points: [],
      /**
       * @description Lines
       * @type {Flyline[]}
       * @default lines = []
       */
      lines: [],
      /**
       * @description Global halo configuration
       * @type {Halo}
       */
      halo: {
        /**
         * @description Whether to show halo
         * @type {Boolean}
         * @default show = false
         */
        show: false,
        /**
         * @description Halo animation duration (1s = 10)
         * @type {[number, number]}
         */
        duration: [20, 30],
        /**
         * @description Halo color
         * @type {String}
         * @default color = '#fb7293'
         */
        color: '#fb7293',
        /**
         * @description Halo radius
         * @type {Number}
         * @default radius = 120
         */
        radius: 120,
      },
      /**
       * @description Global text configuration
       * @type {Text}
       */
      text: {
        /**
         * @description Whether to show text
         * @type {Boolean}
         * @default show = false
         */
        show: false,
        /**
         * @description Text offset
         * @type {[number, number]}
         * @default offset = [0, 15]
         */
        offset: [0, 15],
        /**
         * @description Text color
         * @type {String}
         * @default color = '#ffdb5c'
         */
        color: '#ffdb5c',
        /**
         * @description Text font size
         * @type {Number}
         * @default fontSize = 12
         */
        fontSize: 12,
      },
      /**
       * @description Global icon configuration
       * @type {Icon}
       */
      icon: {
        /**
         * @description Whether to show icon
         * @type {Boolean}
         * @default show = false
         */
        show: false,
        /**
         * @description Icon src
         * @type {String}
         * @default src = ''
         */
        src: '',
        /**
         * @description Icon width
         * @type {Number}
         * @default width = 15
         */
        width: 15,
        /**
         * @description Icon height
         * @type {Number}
         * @default width = 15
         */
        height: 15,
      },
      /**
       * @description Global line configuration
       * @type {Line}
       */
      line: {
        /**
         * @description Line width
         * @type {Number}
         * @default width = 1
         */
        width: 1,
        /**
         * @description Flyline color
         * @type {String}
         * @default color = '#ffde93'
         */
        color: '#ffde93',
        /**
         * @description Orbit color
         * @type {String}
         * @default orbitColor = 'rgba(103, 224, 227, .2)'
         */
        orbitColor: 'rgba(103, 224, 227, .2)',
        /**
         * @description Flyline animation duration
         * @type {[number, number]}
         * @default duration = [20, 30]
         */
        duration: [20, 30],
        /**
         * @description Flyline radius
         * @type {Number}
         * @default radius = 100
         */
        radius: 100,
      },
      /**
       * @description Back ground image url
       * @type {String}
       * @default bgImgSrc = ''
       */
      bgImgSrc: '',
      /**
       * @description K value
       * @type {Number}
       * @default k = -0.5
       * @example k = -1 ~ 1
       */
      k: -0.5,
      /**
       * @description Flyline curvature
       * @type {Number}
       * @default curvature = 5
       */
      curvature: 5,
      /**
       * @description Relative points position
       * @type {Boolean}
       * @default relative = true
       */
      relative: true,
    })
    const status = reactive({
      unique: Math.random(),
      /**
       * @description Fly line data
       * @type {FlylineWithPath[]}
       * @default flylines = []
       */
      flylines: [],
      /**
       * @description Fly line lengths
       * @type {Number[]}
       * @default flylineLengths = []
       */
      flylineLengths: [],
      /**
       * @description Fly line points
       * @default flylinePoints = []
       */
      flylinePoints: [],
      mergedConfig: null,
    })
    const { domRef, width, height, resize } = useAutoResize(calcData)

    async function calcData() {
      mergeConfig()
      calcflylinePoints()
      calcLinePaths()
      await calcLineLengths()
    }

    function mergeConfig() {
      const mergedConfig = deepMerge(deepCopy(defaultConfig.value), props.config || {})

      const { points, lines, halo, text, icon, line } = mergedConfig

      mergedConfig.points = points.map(item => {
        item.halo = deepMerge(deepCopy(halo), item.halo || {})
        item.text = deepMerge(deepCopy(text), item.text || {})
        item.icon = deepMerge(deepCopy(icon), item.icon || {})
        return item
      })

      mergedConfig.lines = lines.map(item => {
        return deepMerge(deepCopy(line), item)
      })
      status.mergedConfig = mergedConfig
    }

    function calcflylinePoints() {
      const { relative, points } = status.mergedConfig
      status.flylinePoints = points.map((item, i) => {
        const { coordinate: [x, y], halo, icon, text } = item
        if (relative) item.coordinate = [x * width.value, y * height.value]
        item.halo.time = randomExtend(...halo.duration) / 10
        const { width: iw, height: ih } = icon
        item.icon.x = item.coordinate[0] - iw / 2
        item.icon.y = item.coordinate[1] - ih / 2
        const [ox, oy] = text.offset
        item.text.x = item.coordinate[0] + ox
        item.text.y = item.coordinate[1] + oy
        item.key = `${item.coordinate.toString()}${i}`
        return item
      })
    }

    function calcLinePaths() {
      const { points, lines } = status.mergedConfig
      status.flylines = lines.map(item => {
        const { source, target, duration } = item
        const sourcePoint = points.find(({ name }) => name === source).coordinate
        const targetPoint = points.find(({ name }) => name === target).coordinate
        const path = getPath(sourcePoint, targetPoint).map(item => item.map(v => parseFloat(v.toFixed(10))))
        const d = `M${path[0].toString()} Q${path[1].toString()} ${path[2].toString()}`
        const key = `path${path.toString()}`
        const time = randomExtend(...duration) / 10
        return { ...item, path, key, d, time }
      })
    }

    function getPath(start, end) {
      const controlPoint = getControlPoint(start, end)
      return [start, controlPoint, end]
    }

    function getControlPoint([sx, sy], [ex, ey]) {
      const { curvature, k } = status.mergedConfig

      const [mx, my] = [(sx + ex) / 2, (sy + ey) / 2]

      const distance = getTwoPointDistance([sx, sy], [ex, ey])

      const targetLength = distance / curvature
      const disDived = targetLength / 2

      let [dx, dy] = [mx, my]

      do {
        dx += disDived
        dy = getKLinePointByx(k, [mx, my], dx)[1]
      } while (getTwoPointDistance([mx, my], [dx, dy]) < targetLength)

      return [dx, dy]
    }

    function getKLinePointByx(k, [lx, ly], x) {
      const y = ly - k * lx + k * x
      return [x, y]
    }

    async function calcLineLengths() {
      await nextTick()
      status.flylineLengths = status.flylines.map(({ key }) => {
        return document.getElementById(key).getTotalLength()
      })
    }

    function consoleClickPos({ offsetX, offsetY }) {
      if (!props.dev) return

      const relativeX = (offsetX / width.value).toFixed(2)
      const relativeY = (offsetY / height.value).toFixed(2)

      console.warn(`bv-flyline-chart DEV: \n Click Position is [${offsetX}, ${offsetY}] \n Relative Position is [${relativeX}, ${relativeY}]`)
    }

    function handlePointClick(point) {
      emit('click', point)
    }

    watch(() => props.config, () => {
      calcData()
    }, { deep: true })
    return {
      defaultConfig,
      ...toRefs(status),
      domRef,
      width,
      height,
      resize,
      flylineGradientId: `flyline-gradient-id-${id}`,
      haloGradientId: `halo-gradient-id-${id}`,
      consoleClickPos,
      handlePointClick,
    }
  },
}
</script>
