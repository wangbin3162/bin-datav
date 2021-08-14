<template>
  <div class="bv-icon-wrapper" :style="styles" @click="handleClick">
    <i :class="`b-iconfont b-icon-${icon}`"></i>
  </div>
</template>

<script>
import { computed } from 'vue'
import { alpha } from '../../utils/color'

export default {
  name: 'BvIcon',
  props: {
    icon: {
      type: String,
      required: true,
    },
    color: {
      type: String,
    },
    size: {
      type: Number,
      default: 32,
    },
    bg: Boolean,
    round: Boolean,
    type: String,
    alpha: {
      type: Number,
      default: 0.2,
    },
  },
  emits: ['click'],
  setup(props, { emit }) {
    const colorVar = computed(() => {
      const color = props.color
      if (!color) return null
      const colorMap = {
        primary: '#1089ff',
        success: '#52c41a',
        warning: '#fea638',
        danger: '#ff4d4f',
      }
      return colorMap[color] ? colorMap[color] : color
    })
    const bgVar = computed(() => {
      const color = colorVar.value
      if (!color || !props.bg) return null
      return alpha(color, props.alpha)
    })

    const styles = computed(() => {
      const size = props.size
      const iconSize = size / 2 + 2
      return {
        cursor: props.type === 'btn' ? 'pointer' : null,
        width: `${size}px`,
        height: `${size}px`,
        fontSize: `${iconSize}px`,
        color: colorVar.value,
        backgroundColor: bgVar.value,
        borderRadius: props.round ? '50%' : '2px',
      }
    })

    function handleClick() {
      if (props.type === 'btn') {
        emit('click', props.icon)
      }
    }

    return {
      colorVar,
      bgVar,
      styles,
      handleClick,
    }
  },
}
</script>
