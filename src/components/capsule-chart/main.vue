<template>
  <div class="bv-capsule-chart">
    <template v-if="mergedConfig">
      <div class="label-column">
        <div v-for="item in mergedConfig.data" :key="item.name">{{ item.name }}</div>
        <div>&nbsp;</div>
      </div>

      <div class="capsule-container">
        <div class="capsule-item" v-for="(capsule, index) in capsuleLength" :key="index">
          <div
            class="capsule-item-column"
            :style="`width: ${capsule * 100}%; background-color: ${mergedConfig.colors[index % mergedConfig.colors.length]};`"
          >
            <div
              v-if="mergedConfig.showValue"
              class="capsule-item-value"
              :class="mergedConfig.valuePosition"
            >{{ capsuleValue[index] }}
            </div>
          </div>
        </div>

        <div class="unit-label">
          <div
            v-for="(label, index) in labelData"
            :key="label + index"
          >{{ label }}
          </div>
        </div>
      </div>

      <div class="unit-text" v-if="mergedConfig.unit">{{ mergedConfig.unit }}</div>
    </template>
  </div>
</template>

<script>
import { deepCopy, deepMerge } from '../../utils/util'
import { reactive, ref, toRefs, watch } from 'vue'
import { defaultColors } from '../../utils/theme'

export default {
  name: 'BvCapsuleChart',
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const defaultConfig = ref({
      /**
       * @description Capsule chart data
       * @type {Array<Object>}
       * @default data = []
       * @example data = [{ name: 'foo1', value: 100 }, { name: 'foo2', value: 100 }]
       */
      data: [],
      /**
       * @description Colors (hex|rgb|rgba|color keywords)
       * @type {Array<String>}
       * @default color = ['#37a2da', '#32c5e9', '#67e0e3', '#9fe6b8', '#ffdb5c', '#ff9f7f', '#fb7293']
       * @example color = ['#000', 'rgb(0, 0, 0)', 'rgba(0, 0, 0, 1)', 'red']
       */
      colors: defaultColors,
      /**
       * @description Chart unit
       * @type {String}
       * @default unit = ''
       */
      unit: '',
      /**
       * @description Show item value
       * @type {Boolean}
       * @default showValue = false
       */
      showValue: false,
      /**
       * @description value
       * @type {String}
       * @default default [right,inner,default]
       */
      valuePosition: 'default',
    })
    const status = reactive({
      mergedConfig: null,
      capsuleLength: [],
      capsuleValue: [],
      labelData: [],
      labelDataLength: [],
    })

    function calcData() {
      mergeConfig()
      calcCapsuleLengthAndLabelData()
    }

    function mergeConfig() {
      status.mergedConfig = deepMerge(deepCopy(defaultConfig.value), props.config || {})
    }

    function calcCapsuleLengthAndLabelData() {
      const { data } = status.mergedConfig
      if (!data.length) return
      const capsuleValue = data.map(({ value }) => value)
      const maxValue = Math.max(...capsuleValue)
      status.capsuleValue = capsuleValue
      status.capsuleLength = capsuleValue.map(v => (maxValue ? v / maxValue : 0))
      const oneFifth = maxValue / 5
      const labelData = Array.from(new Set(new Array(6).fill(0).map((v, i) => Math.ceil(i * oneFifth))))
      status.labelData = labelData
      status.labelDataLength = Array.from(labelData).map(v => maxValue ? v / maxValue : 0)
    }

    watch(() => props.config, () => {
      calcData()
    }, { immediate: true, deep: true })
    return {
      defaultConfig,
      ...toRefs(status),
    }
  },
}
</script>

