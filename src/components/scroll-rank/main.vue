<template>
  <div class="bv-scroll-rank" ref="domRef"
       @mouseenter="handleHover(true)"
       @mouseleave="handleHover(false)">
    <div
      class="row-item"
      v-for="(item, i) in rows"
      :key="item.toString() + item.scroll"
      :style="`height: ${heights[i]}px;`"
    >
      <div class="ranking-info">
        <div class="rank">No.{{ item.ranking }}</div>
        <div class="info-name" v-html="item.name"/>
        <div class="ranking-value">
          {{ mergedConfig.valueFormatter ? mergedConfig.valueFormatter(item) : item.value + mergedConfig.unit }}
        </div>
      </div>
      <div class="ranking-column">
        <div
          class="inside-column"
          :style="`width: ${item.percent}%;`"
        >
          <div class="shine"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onUnmounted, reactive, ref, toRefs, watch } from 'vue'
import { useAutoResize } from '../../hooks'
import { deepCopy, deepMerge } from '../../utils/util'

export default {
  name: 'BvScrollRank',
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, { emit }) {
    const defaultConfig = ref({
      /**
       * @description Board data
       * @type {Array<Object>}
       * @default data = []
       */
      data: [],
      /**
       * @description Row num
       * @type {Number}
       * @default rowNum = 5
       */
      rowNum: 5,
      /**
       * @description Scroll wait time
       * @type {Number}
       * @default waitTime = 2000
       */
      waitTime: 2000,
      /**
       * @description Carousel type
       * @type {String}
       * @default carousel = 'single'
       * @example carousel = 'single' | 'page'
       */
      carousel: 'single',
      /**
       * @description Value unit
       * @type {String}
       * @default unit = ''
       * @example unit = 'ton'
       */
      unit: '',
      /**
       * @description Auto sort by value
       * @type {Boolean}
       * @default sort = true
       */
      sort: true,
      /**
       * @description Value formatter
       * @type {Function}
       * @default valueFormatter = null
       */
      valueFormatter: null,
      /**
       * @description Pause scroll when mouse hovered
       * @type {Boolean}
       * @default hoverPause = true
       * @example hoverPause = true | false
       */
      hoverPause: false,
    })
    const { domRef, width, height, resize } = useAutoResize(calcData)
    const status = reactive({
      mergedConfig: null,
      rowsData: [],
      rows: [],
      heights: [],
      animationIndex: 0,
      animationHandler: '',
      updater: 0,
    })

    function handleHover(enter) {
      if (!status.mergedConfig.hoverPause) return
      if (enter) {
        stopAnimation()
      } else {
        animation(true)
      }
    }

    function onResize() {
      if (!status.mergedConfig) return
      calcHeights(true)
    }

    function calcData() {
      stopAnimation()
      mergeConfig()
      calcRowsData()
      calcHeights()
      animation(true)
    }

    function mergeConfig() {
      status.mergedConfig = deepMerge(deepCopy(defaultConfig.value), props.config || {})
    }

    function calcRowsData() {
      let { data, rowNum, sort } = status.mergedConfig
      sort && data.sort(({ value: a }, { value: b }) => {
        if (a > b) return -1
        if (a < b) return 1
        if (a === b) return 0
      })
      const value = data.map(({ value }) => value)
      const min = Math.min(...value) || 0
      // abs of min
      const minAbs = Math.abs(min)
      const max = Math.max(...value) || 0
      // abs of max
      const maxAbs = Math.abs(max)
      const total = max + minAbs
      data = data.map((row, i) => ({ ...row, ranking: i + 1, percent: (row.value + minAbs) / total * 100 }))
      const rowLength = data.length
      if (rowLength > rowNum && rowLength < 2 * rowNum) {
        data = [...data, ...data]
      }
      data = data.map((d, i) => ({ ...d, scroll: i }))
      status.rowsData = data
      status.rows = data
    }

    function calcHeights(onresize = false) {
      const { rowNum, data } = status.mergedConfig
      const avgHeight = height.value / rowNum
      status.avgHeight = avgHeight
      if (!onresize) status.heights = new Array(data.length).fill(avgHeight)
    }

    async function animation(start = false) {
      let { avgHeight, animationIndex, mergedConfig, rowsData, updater } = status
      const { waitTime, carousel, rowNum } = mergedConfig
      const rowLength = rowsData.length
      if (rowNum >= rowLength) return
      if (start) {
        await new Promise(resolve => setTimeout(resolve, waitTime))
        if (updater !== status.updater) return
      }
      const animationNum = carousel === 'single' ? 1 : rowNum
      let rows = rowsData.slice(animationIndex)
      rows.push(...rowsData.slice(0, animationIndex))
      status.rows = rows.slice(0, rowNum + 1)
      status.heights = new Array(rowLength).fill(avgHeight)
      await new Promise(resolve => setTimeout(resolve, 300))
      if (updater !== status.updater) return
      status.heights.splice(0, animationNum, ...new Array(animationNum).fill(0))
      animationIndex += animationNum
      const back = animationIndex - rowLength
      if (back >= 0) animationIndex = back

      status.animationIndex = animationIndex
      status.animationHandler = setTimeout(animation, waitTime - 300)
    }

    function stopAnimation() {
      const { animationHandler, updater } = status
      status.updater = (updater + 1) % 999999
      if (!animationHandler) return
      clearTimeout(animationHandler)
    }

    watch(() => props.config, () => {
      stopAnimation()
      status.animationIndex = 0
      calcData()
    }, { deep: true })
    onUnmounted(() => {
      stopAnimation()
    })
    return {
      defaultConfig,
      ...toRefs(status),
      domRef,
      width,
      height,
      resize,
      handleHover,
    }
  },
}
</script>
