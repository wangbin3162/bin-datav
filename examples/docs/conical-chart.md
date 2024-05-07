## Conical Chart 锥形图

锥形图，类似柱状图，用于显示排名等信息，简单直观

### 基本用法

::: demo 因文档开发原因，所有图片已存储为base64，只需在使用时将实际图片require至img属性中即可

```html

<template>
  <div flex="main:center">
    <bv-conical-chart :config="config" style="width:400px;height:200px;"></bv-conical-chart>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        config: {
          data: [
            { name: '漯河', value: 167 },
            { name: '三门峡', value: 123 },
            { name: '郑州', value: 98 },
            { name: '周口', value: 89 },
            { name: '濮阳', value: 68 },
            { name: '信阳', value: 58 },
            { name: '新乡', value: 38 },
          ],
          img: [
            'https://wangbin3162.github.io/bin-files/other/1st.png',
            'https://wangbin3162.github.io/bin-files/other/2st.png',
            'https://wangbin3162.github.io/bin-files/other/3st.png',
            'https://wangbin3162.github.io/bin-files/other/4st.png',
            'https://wangbin3162.github.io/bin-files/other/5st.png',
            'https://wangbin3162.github.io/bin-files/other/6st.png',
            'https://wangbin3162.github.io/bin-files/other/7st.png',
          ]
        }
      }
    }
  }
</script>
```

:::

### 显示数值

::: demo 因文档开发原因，所有图片已存储为base64，只需在使用时将实际图片require至img属性中即可

```html

<template>
  <div flex="main:center">
    <bv-conical-chart :config="config" style="width:400px;height:200px;"></bv-conical-chart>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        config: {
          data: [
            { name: '漯河', value: 167 },
            { name: '三门峡', value: 123 },
            { name: '郑州', value: 98 },
            { name: '周口', value: 89 },
            { name: '濮阳', value: 68 },
            { name: '信阳', value: 58 },
            { name: '新乡', value: 38 },
          ],
          img: [
            'https://wangbin3162.github.io/bin-files/other/1st.png',
            'https://wangbin3162.github.io/bin-files/other/2st.png',
            'https://wangbin3162.github.io/bin-files/other/3st.png',
            'https://wangbin3162.github.io/bin-files/other/4st.png',
            'https://wangbin3162.github.io/bin-files/other/5st.png',
            'https://wangbin3162.github.io/bin-files/other/6st.png',
            'https://wangbin3162.github.io/bin-files/other/7st.png',
          ],
          showValue: true
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
| data   | 柱数据，内容为{name:'名称',value:'数值'}   | Array  |    —      |    []    |
| img   | 柱顶图片url   | Array  |    —      |    []    |
| fontSize   | 文字大小   | Number  |    —      |   12   |
| imgSideLength   | 图片边长   | Number  |    —      |  30   |
| color   | 颜色   | String  |    —      |  'rgba(0, 194, 255, 0.4)'   |
| textColor   | 文字颜色   | String  |    —      |  #fff   |
| showValue   | 显示数值   | Boolean  |    —      |  false   |
