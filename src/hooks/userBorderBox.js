import useAutoResize from './useAutoResize'
import { onMounted, ref, watch } from 'vue'
import { deepCopy, deepMerge } from '../utils/util'

/**
 * border-hook
 * @param props
 * @param _defaultColor 默认颜色
 */
export default function userBorderBox(props, _defaultColor = []) {
  const autoResize = useAutoResize(props)
  const mergedColor = ref([])
  const defaultColor = ref(_defaultColor)

  function mergeColor() {
    mergedColor.value = deepMerge(deepCopy(defaultColor.value), props.color || [])
  }

  watch(() => props.color, (val) => {
    mergeColor()
  })
  onMounted(() => {
    mergeColor()
  })
  return {
    ...autoResize,
    defaultColor,
    mergedColor,
  }
}
