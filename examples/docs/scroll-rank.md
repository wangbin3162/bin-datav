## ScrollRank 排名轮播表

类似轮播表格，排名有时也需要滚动显示，排名柱图，均为css样式，如需修改不同的样式效果，请自行覆盖实现。

### 基础用法

::: demo

```html

<template>
  <div flex="main:center">
    <bv-scroll-rank :config="config" style="width: 500px; height: 300px;"></bv-scroll-rank>
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
          ]
        }
      }
    }
  }
</script>
```

:::

### 数值单位

::: demo

```html

<template>
  <div flex="main:center">
    <bv-scroll-rank :config="config" style="width: 500px; height: 300px;"></bv-scroll-rank>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        config: {
          data: [
            { name: '荣成', value: 2670 },
            { name: '河南', value: 2070 },
            { name: '河北', value: 1870 },
            { name: '徐州', value: 1700 },
            { name: '漯河', value: 1676 },
            { name: '三门峡', value: 1234 },
            { name: '郑州', value: 982 },
            { name: '周口', value: 891 },
            { name: '濮阳', value: 683 },
            { name: '信阳', value: 587 },
            { name: '新乡', value: 383 },
            { name: '大同', value: 181 },
          ],
          unit: '分'
        }
      }
    }
  }
</script>
```

:::

### 数值格式化

::: demo

```html

<template>
  <div flex="main:center">
    <bv-scroll-rank :config="config" style="width: 500px; height: 300px;"></bv-scroll-rank>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        config: {
          data: [
            { name: '荣成', value: 26700 },
            { name: '河南', value: 20700 },
            { name: '河北', value: 18700 },
            { name: '徐州', value: 17800 },
            { name: '漯河', value: 16756 },
            { name: '三门峡', value: 12343 },
            { name: '郑州', value: 9822 },
            { name: '周口', value: 8912 },
            { name: '濮阳', value: 6834 },
            { name: '信阳', value: 5875 },
            { name: '新乡', value: 3832 },
            { name: '大同', value: 1811 },
          ],
          valueFormatter({ value }) {
            const reverseNumber = (value + '').split('').reverse()
            let valueStr = ''
            while (reverseNumber.length) {
              const seg = reverseNumber.splice(0, 3).join('')
              valueStr += seg
              if (seg.length === 3) valueStr += ','
            }
            return valueStr.split('').reverse().join('')
          }
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
| data   | 表数据[{name,value}]   | Array  |    —      |    []    |
| rowNum | 表行数   | Number  |    —      |  5    |
| waitTime   | 轮播时间间隔(ms)   | Number  |   —      | 2000 |
| unit   | 数值单位   | String  |   —      |  —   |
| sort   | 自动排序   | Boolean  |   —      | true   |
| valueFormatter   | 数值格式化(name,value,percent,ranking)   | Function  |   —      | undefined   |
| hoverPause   | 悬浮暂停轮播   | Boolean  |  true|false         |   false   |
