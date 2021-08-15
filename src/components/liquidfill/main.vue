<template>
  <div class="bv-liquid-fill">
    <svg v-if="renderer">
      <defs>
        <linearGradient :id="gradientId" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop v-for="lc in svgBorderGradient" :key="lc[0]"
                :offset="lc[0]"
                :stop-color="lc[1]"/>
        </linearGradient>
      </defs>
      <text
        v-if="renderer"
        :stroke="mergedConfig.textColor||`url(#${gradientId})`"
        :fill="mergedConfig.textColor||`url(#${gradientId})`"
        :x="renderer.area[0] / 2 + 8"
        :y="renderer.area[1] / 2 + 8"
      >
        {{ details }}
      </text>
      <ellipse v-if="!shape || shape === 'round'"
               :cx="renderer.area[0] / 2 + 8"
               :cy="renderer.area[1] / 2 + 8"
               :rx="renderer.area[0] / 2 + 5"
               :ry="renderer.area[1] / 2 + 5"
               :stroke="`url(#${gradientId})`"/>
      <rect v-else
            x="2" y="2"
            :rx="shape === 'roundRect' ? 10 : 0"
            :ry="shape === 'roundRect' ? 10 : 0"
            :width="renderer.area[0] + 12"
            :height="renderer.area[1] + 12"
            :stroke="`url(#${gradientId})`"/>
    </svg>

    <canvas ref="liquidFillRef" :style="`border-radius: ${radius};`"/>
  </div>
</template>

<script>
import { ref } from 'vue'
import CRender from '@jiaminghi/c-render'
import { deepCopy, deepMerge, generateId } from '../../utils/util'
import { computed, onBeforeUnmount, onMounted, reactive, toRefs, watch } from 'vue'

export default {
  name: 'BvLiquidFill',
  props: {
    config: Object,
    default: () => ({}),
  },
  setup(props) {
    const id = generateId()
    const liquidFillRef = ref(null)
    const defaultConfig = ref({
      /**
       * @description Data
       * @type {Array<Number>}
       * @default data = []
       * @example data = [60, 40]
       */
      data: [],
      /**
       * @description Shape of wanter level pond
       * @type {String}
       * @default shape = 'round'
       * @example shape = 'rect' | 'roundRect' | 'round'
       */
      shape: 'round',
      /**
       * @description Water wave number
       * @type {Number}
       * @default waveNum = 2
       */
      waveNum: 2,
      /**
       * @description Water wave height (px)
       * @type {Number}
       * @default waveHeight = 20
       */
      waveHeight: 20,
      /**
       * @description Wave opacity
       * @type {Number}
       * @default waveOpacity = 0.4
       */
      waveOpacity: 0.4,
      /**
       * @description Colors (hex|rgb|rgba|color keywords)
       * @type {Array<String>}
       * @default colors = ['#00BAFF', '#3DE7C9']
       * @example colors = ['#000', 'rgb(0, 0, 0)', 'rgba(0, 0, 0, 1)', 'red']
       */
      colors: ['#3DE7C9', '#00BAFF'],
      /**
       * @description Formatter
       * @type {String}
       * @default formatter = '{value}%'
       */
      formatter: '{value}%',
    })
    const status = reactive({
      mergedConfig: {},
      svgBorderGradient: [],
      details: '',
      renderer: null,
      waves: [],
      animation: false,
    })

    const radius = computed(() => {
      const { shape } = status.mergedConfig
      if (shape === 'round') return '50%'
      if (shape === 'rect') return '0'
      if (shape === 'roundRect') return '10px'
      return '0'
    })
    const shape = computed(() => {
      const { shape } = status.mergedConfig
      if (!shape) return 'rect'
      return shape
    })

    function init() {
      initRender()
      if (!props.config) return
      calcData()
    }

    function initRender() {
      status.renderer = new CRender(liquidFillRef.value)
    }

    function calcData() {
      mergeConfig()
      calcSvgBorderGradient()
      calcDetails()
      addWave()
      animationWave()
    }

    function mergeConfig() {
      status.mergedConfig = deepMerge(deepCopy(defaultConfig.value), props.config)
    }

    function calcSvgBorderGradient() {
      const { colors } = status.mergedConfig
      const colorNum = colors.length
      const colorOffsetGap = 100 / (colorNum - 1)
      status.svgBorderGradient = colors.map((c, i) => [colorOffsetGap * i, c])
    }

    function calcDetails() {
      const { data, formatter } = status.mergedConfig
      if (!data.length) {
        status.details = ''
        return
      }
      const maxValue = Math.max(...data)
      status.details = formatter.replace('{value}', maxValue)
    }

    function addWave() {
      const shapes = getWaveShapes()
      const style = getWaveStyle()
      status.waves = shapes.map(shape => status.renderer.add({
        name: 'smoothline',
        animationFrame: 300,
        shape,
        style,
        drawed,
      }))
    }

    function getWaveShapes() {
      const { waveNum, waveHeight, data } = status.mergedConfig
      const [w, h] = status.renderer.area
      const pointsNum = waveNum * 4 + 4
      const pointXGap = w / waveNum / 2
      return data.map(v => {
        let points = new Array(pointsNum).fill(0).map((foo, j) => {
          const x = w - pointXGap * j
          const startY = (1 - v / 100) * h
          const y = j % 2 === 0 ? startY : startY - waveHeight
          return [x, y]
        })
        points = points.map(p => mergeOffset(p, [pointXGap * 2, 0]))
        return { points }
      })
    }

    function mergeOffset([x, y], [ox, oy]) {
      return [x + ox, y + oy]
    }

    function getWaveStyle() {
      const h = status.renderer.area[1]
      return {
        gradientColor: status.mergedConfig.colors,
        gradientType: 'linear',
        gradientParams: [0, 0, 0, h],
        gradientWith: 'fill',
        opacity: status.mergedConfig.waveOpacity,
        translate: [0, 0],
      }
    }

    function drawed({ shape: { points } }, { ctx, area }) {
      const firstPoint = points[0]
      const lastPoint = points.slice(-1)[0]
      const h = area[1]
      ctx.lineTo(lastPoint[0], h)
      ctx.lineTo(firstPoint[0], h)
      ctx.closePath()
      ctx.fill()
    }

    async function animationWave(repeat = 1) {
      const { waves, animation } = status
      if (animation) return
      status.animation = true
      const w = status.renderer.area[0]
      waves.forEach(graph => {
        graph.attr('style', { translate: [0, 0] })
        graph.animation('style', {
          translate: [w, 0],
        }, true)
      })
      await status.renderer.launchAnimation()
      status.animation = false

      if (!status.renderer.graphs.length) return
      animationWave(repeat + 1)
    }

    onMounted(() => {
      init()
    })
    onBeforeUnmount(() => {
      if (status.renderer) {
        status.renderer.delAllGraph()
        status.waves = []
      }
    })
    watch(() => props.config, () => {
      if (!status.renderer) return
      status.renderer.delAllGraph()
      status.waves = []
      setTimeout(calcData, 0)
    }, { deep: true })
    return {
      liquidFillRef,
      gradientId: `liquid-fill-${id}`,
      defaultConfig,
      ...toRefs(status),
      radius,
      shape,
    }
  },
}
</script>

