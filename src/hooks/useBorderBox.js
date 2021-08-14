import useAutoResize from './useAutoResize'
import { onMounted, ref, watch } from 'vue'
import { deepCopy, deepMerge } from '../utils/util'

/**
 * border-hook
 * @param props
 * @param _defaultColor 默认颜色
 * @param afterResizeFun resize容器之后执行函数
 */
export default function useBorderBox(props, _defaultColor = [], afterResizeFun) {
  const { domRef, width, height, resize } = useAutoResize(afterResizeFun)
  const mergedColor = ref([])
  const defaultColor = ref(_defaultColor)

  function mergeColor() {
    mergedColor.value = deepMerge(deepCopy(defaultColor.value), props.color || [])
  }

  watch(() => [props.color, props.reverse], () => {
    mergeColor()
  })
  onMounted(() => {
    mergeColor()
  })
  return {
    domRef,
    width,
    height,
    resize,
    defaultColor,
    mergedColor,
  }
}
