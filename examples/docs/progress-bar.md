## Progress Bar 进度图

区别于进度条和水球图，横向的进度图也是常用的图示

### 基本用法

::: demo

```html

<template>
  <div flex="main:center">
    <bv-progress-bar :config="config" style="width: 200px;height: 100px;"></bv-progress-bar>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        config: {
          value: 58
        }
      }
    }
  }
</script>
```

:::

### 边框设置

::: demo

```html

<template>
  <div flex="main:center">
    <bv-progress-bar :config="config" style="width: 200px;height: 100px;"></bv-progress-bar>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        config: {
          value: 58,
          borderWidth: 5,
          borderRadius: 10,
          borderGap: 5
        }
      }
    }
  }
</script>
```

:::

### 间隙和渐变

可以设置间隙设置和渐变色

::: demo

```html

<template>
  <div flex="main:center">
    <bv-progress-bar :config="config" style="width: 200px;height: 100px;"></bv-progress-bar>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        config: {
          value: 58,
          lineDash: [10, 2],
          localGradient: true
        }
      }
    }
  }
</script>
```

:::

### 间隙和渐变

可以设置间隙设置和渐变色

::: demo

```html

<template>
  <div flex="main:center">
    <bv-progress-bar :config="config" style="width: 300px;height: 42px;"></bv-progress-bar>
  </div>
</template>
<script>
  const fullWidth = 300
  const borderGap = 3
  const borderWidth = 3
  const usefulWidth = fullWidth - (borderGap + borderWidth) * 2

  const pieceLength = [0.25, 0.5, 0.25]
  const pieceGap = 3

  const lineDash = pieceLength
      .map(l => [usefulWidth * l, pieceGap])
      .reduce((all, current) => [...all, ...current], [])
  export default {
    data() {
      return {
        config: {
          value: 100,
          colors: ['#01c4f9', '#c135ff'],
          lineDash,
          showNumber: false
        }
      }
    }
  }
</script>
```

:::

### Props

| 参数     | 说明    | 类型      | 可选值       | 默认值   |
|----------|-------- |---------- |-------------  |-------- |
| config   | 定义的config配置项，主要包含下面几个属性值   | Object  |    —      |     {}     |

### config

| 参数     | 说明    | 类型      | 可选值       | 默认值   |
|----------|-------- |---------- |-------------  |-------- |
| value   | 水位位置，可以多水位，默认显示最大值   | Array  |    —      |    []    |
| colors   | 配色，2个颜色值，默认会渐变，如不需要渐变，传入两个同色即可   | Array  |    —      |  默认色     |
| borderWidth | 边框宽度   | Number  |    —      |  3     |
| borderGrp   | 边框间隙   | Number  |   —      |  3     |
| lineDash   | 线条间隙   | Array  |   —      |  [5,1]    |
| textColor   | 文字颜色   | String  |   —      | #fff     |
| borderRadius   | 边框圆角   | Number  |   —      |  5  |
| localGradient   | 是否开启局部渐变   | Boolean  |   —      | false  |
| formatter   | 文字颜色   | String  |   —      | '{value}%'     |
