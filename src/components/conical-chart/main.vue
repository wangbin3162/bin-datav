<template>
  <div class="bv-conical-chart" ref="domRef">
    <svg :width="width" :height="height">
      <g
        v-for="(item, i) in column"
        :key="i"
      >
        <path
          :d="item.d"
          :fill="mergedConfig.color"
        />
        <text
          :style="`font-size:${mergedConfig.fontSize}px`"
          :fill="mergedConfig.textColor"
          :x="item.x"
          :y="height - 4"
        >
          {{ item.name }}
        </text>
        <image
          v-if="mergedConfig.img.length"
          :xlink:href="mergedConfig.img[i % mergedConfig.img.length]"
          :width="mergedConfig.imgSideLength"
          :height="mergedConfig.imgSideLength"
          :x="item.x - mergedConfig.imgSideLength / 2"
          :y="item.y - mergedConfig.imgSideLength"
        />
        <text
          v-if="mergedConfig.showValue"
          :style="`font-size:${mergedConfig.fontSize}px`"
          :fill="mergedConfig.textColor"
          :x="item.x"
          :y="item.textY"
        >
          {{ item.value }}
        </text>
      </g>
    </svg>
  </div>
</template>

<script>
import { deepCopy, deepMerge } from '../../utils/util'
import { reactive, ref, toRefs, watch } from 'vue'
import useAutoResize from '../../hooks/useAutoResize'

export default {
  name: 'BvConicalChart',
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const defaultConfig = ref({
      /**
       * @description Chart data
       * @type {Array<Object>}
       * @default data = []
       */
      data: [],
      /**
       * @description Chart img
       * @type {Array<String>}
       * @default img = []
       */
      img: [],
      /**
       * @description Chart font size
       * @type {Number}
       * @default fontSize = 12
       */
      fontSize: 12,
      /**
       * @description Img side length
       * @type {Number}
       * @default imgSideLength = 30
       */
      imgSideLength: 30,
      /**
       * @description Column color
       * @type {String}
       * @default color = 'rgba(0, 194, 255, 0.4)'
       */
      color: 'rgba(0, 194, 255, 0.4)',
      /**
       * @description Text color
       * @type {String}
       * @default textColor = '#fff'
       */
      textColor: '#fff',
      /**
       * @description Show value
       * @type {Boolean}
       * @default showValue = false
       */
      showValue: false,
    })
    const status = reactive({
      mergedConfig: null,
      column: [],
    })
    const { domRef, width, height, resize } = useAutoResize(calcData)

    function calcData() {
      mergeConfig()
      initData()
      calcSVGPath()
    }

    function mergeConfig() {
      status.mergedConfig = deepMerge(deepCopy(defaultConfig.value), props.config || {})
    }

    function initData() {
      const { mergedConfig } = status
      let { data } = mergedConfig
      data = deepCopy(data)
      data.sort(({ value: a }, { value: b }) => {
        if (a > b) return -1
        if (a < b) return 1
        if (a === b) return 0
      })
      const max = data[0] ? data[0].value : 10
      data = data.map(item => ({
        ...item,
        percent: item.value / max,
      }))
      mergedConfig.data = data
    }

    function calcSVGPath() {
      const { imgSideLength, fontSize, data } = status.mergedConfig

      const itemNum = data.length
      const gap = width.value / (itemNum + 1)

      const useAbleHeight = height.value - imgSideLength - fontSize - 5
      const svgBottom = height.value - fontSize - 5

      status.column = data.map((item, i) => {
        const { percent } = item

        const middleXPos = gap * (i + 1)
        const leftXPos = gap * i
        const rightXpos = gap * (i + 2)

        const middleYPos = svgBottom - useAbleHeight * percent
        const controlYPos = useAbleHeight * percent * 0.6 + middleYPos

        const d = `
          M${leftXPos}, ${svgBottom}
          Q${middleXPos}, ${controlYPos} ${middleXPos},${middleYPos}
          M${middleXPos},${middleYPos}
          Q${middleXPos}, ${controlYPos} ${rightXpos},${svgBottom}
          L${leftXPos}, ${svgBottom}
          Z
        `

        const textY = (svgBottom + middleYPos) / 2 + fontSize / 2

        return {
          ...item,
          d,
          x: middleXPos,
          y: middleYPos,
          textY,
        }
      })
    }

    watch(() => props.config, () => {
      calcData()
    }, { immediate: true, deep: true })
    return {
      defaultConfig,
      ...toRefs(status),
      domRef,
      width,
      height,
      resize,
    }
  },
}
</script>
