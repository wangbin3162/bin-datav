## Liquid Fill 水球图

水球图也是比较常见的数据展示效果，这里水球图的渲染依赖[c-render](http://crender.jiaminghi.com/guide/)

### 基本水球图

基本水球图

::: demo

```html

<template>
  <div flex="main:center">
    <bv-liquid-fill :config="config" style="width: 150px;height: 150px;"></bv-liquid-fill>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        config: {
          data: [60]
        }
      }
    }
  }
</script>
```

:::

### 矩形水球图

通过 shape 设置水球图的类型

::: demo

```html

<template>
  <div flex="main:center">
    <div style="margin-right: 24px;">
      <bv-liquid-fill :config="config" style="width: 120px;height: 150px;"></bv-liquid-fill>
      <p class="t-center">rect</p>
    </div>
    <div style="margin-left: 24px;">
      <bv-liquid-fill :config="config2" style="width: 120px;height: 150px;"></bv-liquid-fill>
      <p class="t-center">roundRect</p>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        config: {
          data: [60],
          shape: 'rect'
        },
        config2: {
          data: [55],
          shape: 'roundRect'
        }
      }
    }
  }
</script>
```

:::

### 其他参数设置

组件提供多个参数来设置，具体参考最下方说明

::: demo

```html

<template>
  <div flex="main:center">
    <bv-liquid-fill :config="config" style="width: 170px;height: 170px;stroke:#fff;fill:#fff;"></bv-liquid-fill>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        config: {
          data: [60, 66],
          colors: ['#9b39ab', '#5073fb'],
          waveNum: 3,
          waveHeight: 10,
          waveOpacity: 0.3,
          textColor: '#fff'
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
| data   | 水位位置，可以多水位，默认显示最大值   | Array  |    —      |    []    |
| shape   | 形状   | String  |    round（默认），rect，roundRect     |    —      |
| colors   | 配色，2个颜色值，默认会渐变，如不需要渐变，传入两个同色即可   | Array  |    —      |  默认色     |
| waveNum   | 波浪数量   | Number  |    —      |  2     |
| waveHeight   | 波浪高度   | Number  |   —      |  20     |
| waveOpacity   | 波浪透明度   | Number  |   —      |  0.4     |
| formatter   | 显示文字格式化   | String  |   —      | '{value}%'     |
| textColor   | 显示文字颜色   | String  |   —      |   —     |
