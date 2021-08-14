/**
 * 自适应resize-hook
 */
import { nextTick, onBeforeUnmount, onMounted, reactive, ref, toRefs } from 'vue'
import { addResizeListener, removeResizeListener } from '../utils/resize-event'
import { debounce } from '../utils/util'

/**
 * 自适应resize
 * @param afterResizeFun resize容器之后执行函数
*/
export default function useAutoResize(afterResizeFun) {
  const domRef = ref(null) // dorm容器，默认设置为domRef
  const status = reactive({
    width: 0,
    height: 0,
  })
  let __resizeHandler = null

  function resize(resize = true) {
    nextTick().then(() => {
      const dom = domRef.value
      status.width = dom ? dom.clientWidth : 0
      status.height = dom ? dom.clientHeight : 0

      if (!dom) {
        console.warn('bin-datav: Failed to get dom node, component rendering may be abnormal!')
      } else if (!status.width || !status.height) {
        console.warn('bin-datav: Component width or height is 0px, rendering abnormality may occur!')
      }

      if (typeof afterResizeFun === 'function' && resize) afterResizeFun()
    })
  }

  onMounted(() => {
    resize()
    __resizeHandler = debounce(resize, 100)
    addResizeListener(domRef.value, __resizeHandler)
  })
  onBeforeUnmount(() => {
    removeResizeListener(domRef.value, __resizeHandler)
  })

  return {
    domRef,
    ...toRefs(status),
    resize,
  }
}
