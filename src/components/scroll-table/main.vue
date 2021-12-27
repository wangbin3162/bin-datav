<template>
  <div class="bv-scroll-table" ref="domRef">
    <div class="header" v-if="header.length && mergedConfig" :style="`background-color: ${mergedConfig.headerBGC};`">
      <div
        class="header-item"
        v-for="(headerItem, i) in header"
        :key="`${headerItem}${i}`"
        :style="`
          height: ${mergedConfig.headerHeight}px;
          line-height: ${mergedConfig.headerHeight}px;
          width: ${widths[i]}px;
        `"
        :align="aligns[i]"
        v-html="headerItem"
      />
    </div>

    <div
      v-if="mergedConfig"
      class="rows"
      :style="`height: ${height - (header.length ? mergedConfig.headerHeight : 0)}px;`"
    >
      <div
        class="row-item"
        v-for="(row, ri) in rows"
        :key="`${row.toString()}${row.scroll}`"
        :style="`
          height: ${heights[ri]}px;
          line-height: ${heights[ri]}px;
          background-color: ${mergedConfig[row.rowIndex % 2 === 0 ? 'evenRowBGC' : 'oddRowBGC']};
        `"
      >
        <div
          class="cell"
          v-for="(cell, ci) in row.cells"
          :key="`${cell}${ri}${ci}`"
          :style="`width: ${widths[ci]}px;`"
          :align="aligns[ci]"
          v-html="cell"
          @click="emitEvent('click', ri, ci, row, cell)"
          @mouseenter="handleHover(true, ri, ci, row, cell)"
          @mouseleave="handleHover(false)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useAutoResize } from '../../hooks'
import { onUnmounted, reactive, ref, toRefs, watch } from 'vue'
import { deepMerge, deepCopy } from '../../utils/util'

export default {
  name: 'BvScrollTable',
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['mouseover', 'click'],
  setup(props, { emit }) {
    const defaultConfig = ref({
      /**
       * @description Board header
       * @type {Array<String>}
       * @default header = []
       * @example header = ['column1', 'column2', 'column3']
       */
      header: [],
      /**
       * @description Board data
       * @type {Array<Array>}
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
       * @description Header background color
       * @type {String}
       * @default headerBGC = '#00BAFF'
       */
      headerBGC: '#00BAFF',
      /**
       * @description Odd row background color
       * @type {String}
       * @default oddRowBGC = '#003B51'
       */
      oddRowBGC: '#003B51',
      /**
       * @description Even row background color
       * @type {String}
       * @default evenRowBGC = '#003B51'
       */
      evenRowBGC: '#0A2732',
      /**
       * @description Scroll wait time
       * @type {Number}
       * @default waitTime = 2000
       */
      waitTime: 2000,
      /**
       * @description Header height
       * @type {Number}
       * @default headerHeight = 35
       */
      headerHeight: 35,
      /**
       * @description Column width
       * @type {Array<Number>}
       * @default columnWidth = []
       */
      columnWidth: [],
      /**
       * @description Column align
       * @type {Array<String>}
       * @default align = []
       * @example align = ['left', 'center', 'right']
       */
      align: [],
      /**
       * @description Show index
       * @type {Boolean}
       * @default index = false
       */
      index: false,
      /**
       * @description index Header
       * @type {String}
       * @default indexHeader = '#'
       */
      indexHeader: '#',
      /**
       * @description Carousel type
       * @type {String}
       * @default carousel = 'single'
       * @example carousel = 'single' | 'page'
       */
      carousel: 'single',
      /**
       * @description Pause scroll when mouse hovered
       * @type {Boolean}
       * @default hoverPause = true
       * @example hoverPause = true | false
       */
      hoverPause: true,
    })
    const { domRef, width, height, resize } = useAutoResize(calcData)
    const status = reactive({
      mergedConfig: null,
      header: [],
      rowsData: [],
      rows: [],
      widths: [],
      heights: [],
      avgHeight: 0,
      aligns: [],
      animationIndex: 0,
      animationHandler: '',
      updater: 0,
      needCalc: false,
    })

    function handleHover(enter, ri, ci, row, cell) {
      if (enter) emitEvent('mouseover', ri, ci, row, cell)
      if (!status.mergedConfig.hoverPause) return
      if (enter) {
        stopAnimation()
      } else {
        animation(true)
      }
    }

    function onResize() {
      if (!status.mergedConfig) return
      calcWidths()
      calcHeights()
    }

    function calcData() {
      stopAnimation()
      mergeConfig()
      calcHeaderData()
      calcRowsData()
      calcWidths()
      calcHeights()
      calcAligns()
      animation(true)
    }

    function mergeConfig() {
      status.mergedConfig = deepMerge(deepCopy(defaultConfig.value), props.config || {})
    }

    function calcHeaderData() {
      let { header, index, indexHeader } = status.mergedConfig
      if (!header.length) {
        status.header = []
        return
      }
      header = [...header]
      if (index) header.unshift(indexHeader)
      status.header = header
    }

    function calcRowsData() {
      let { data, index, headerBGC, rowNum } = status.mergedConfig
      if (index) {
        data = data.map((row, i) => {
          row = [...row]
          const indexTag = `<span class="index" style="background-color: ${headerBGC};">${i + 1}</span>`
          row.unshift(indexTag)
          return row
        })
      }
      data = data.map((cells, i) => ({ cells, rowIndex: i }))
      const rowLength = data.length
      if (rowLength > rowNum && rowLength < 2 * rowNum) {
        data = [...data, ...data]
      }
      data = data.map((d, i) => ({ ...d, scroll: i }))
      status.rowsData = data
      status.rows = data
    }

    function calcWidths() {
      const { mergedConfig, rowsData } = status
      const { columnWidth, header } = mergedConfig
      const usedWidth = columnWidth.reduce((all, w) => all + w, 0)
      let columnNum = 0
      if (rowsData[0]) {
        columnNum = rowsData[0].cells.length
      } else if (header.length) {
        columnNum = header.length
      }
      const avgWidth = (width.value - usedWidth) / (columnNum - columnWidth.length)
      const widths = new Array(columnNum).fill(avgWidth)
      status.widths = deepMerge(widths, columnWidth)
    }

    function calcHeights(onresize = false) {
      const { mergedConfig, header } = status
      const { headerHeight, rowNum, data } = mergedConfig
      let allHeight = height.value
      if (header.length) allHeight -= headerHeight
      const avgHeight = allHeight / rowNum
      status.avgHeight = avgHeight
      if (!onresize) status.heights = new Array(data.length).fill(avgHeight)
    }

    function calcAligns() {
      const { header, mergedConfig } = status
      const columnNum = header.length
      let aligns = new Array(columnNum).fill('left')
      const { align } = mergedConfig
      status.aligns = deepMerge(aligns, align)
    }

    async function animation(start = false) {
      const { needCalc, calcHeights, calcRowsData } = status
      if (needCalc) {
        calcRowsData()
        calcHeights()
        status.needCalc = false
      }
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
      status.rows = rows.slice(0, carousel === 'page' ? rowNum * 2 : rowNum + 1)
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

    function emitEvent(type, ri, ci, row, cell) {
      const { cells, rowIndex } = row
      emit(type, {
        row: cells,
        cell,
        rowIndex,
        columnIndex: ci,
      })
    }

    function updateRows(rows, animationIndex) {
      const { mergedConfig, animationHandler } = status

      status.mergedConfig = {
        ...mergedConfig,
        data: [...rows],
      }

      status.needCalc = true

      if (typeof animationIndex === 'number') status.animationIndex = animationIndex
      if (!animationHandler) animation(true)
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
      updateRows,
      handleHover,
      onResize,
      emitEvent,
    }
  },
}
</script>
