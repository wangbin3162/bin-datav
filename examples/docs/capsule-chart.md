## CapsuleChart 胶囊柱图

横向的胶囊柱图，较为常用，且一般为少数类别的横向比对，为此，此组件即为简易的柱图显示

### 基础用法

::: demo

```html

<template>
  <div flex="main:center">
    <bv-capsule-chart :config="config" style="width:300px;height:200px"></bv-capsule-chart>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        config: {
          data: [
            { name: '漯河', value: 167 },
            { name: '郑州', value: 68 },
            { name: '周口', value: 89 },
            { name: '濮阳', value: 98 },
            { name: '三门峡', value: 123 }
          ]
        }
      }
    }
  }
</script>
```

:::

### 设置单位

可以在config配置项中设置unit来显示单位

::: demo

```html

<template>
  <div flex="main:center">
    <bv-capsule-chart :config="config" style="width:300px;height:200px"></bv-capsule-chart>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        config: {
          data: [
            { name: '漯河', value: 167 },
            { name: '郑州', value: 68 },
            { name: '周口', value: 89 },
            { name: '濮阳', value: 98 },
            { name: '三门峡', value: 123 }
          ],
          unit: '条数'
        }
      }
    }
  }
</script>
```

:::

### 设置颜色

默认提供了一套基础的样式颜色，如需替换，请在配置项中设置colors属性

::: demo

```html

<template>
  <div flex="main:center">
    <bv-capsule-chart :config="config" style="width:300px;height:200px"></bv-capsule-chart>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        config: {
          data: [
            { name: '漯河', value: 167 },
            { name: '郑州', value: 68 },
            { name: '周口', value: 89 },
            { name: '濮阳', value: 98 },
            { name: '三门峡', value: 123 }
          ],
          colors: ['#e062ae', '#96bfff', '#e690d1', '#32c5e9', '#fb7293'],
        }
      }
    }
  }
</script>
```

:::

### 显示数值

开启showValue：true可以显示数值

::: demo

```html

<template>
  <div flex="main:center">
    <bv-capsule-chart :config="config" style="width:300px;height:200px"></bv-capsule-chart>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        config: {
          data: [
            { name: '漯河', value: 167 },
            { name: '郑州', value: 68 },
            { name: '周口', value: 89 },
            { name: '濮阳', value: 98 },
            { name: '三门峡', value: 123 }
          ],
          colors: ['#e062ae', '#96bfff', '#e690d1', '#32c5e9', '#fb7293'],
          unit: '(条)',
          showValue: true
        }
      }
    }
  }
</script>
```

:::

### 数值显示位置

可以设置 valuePosition 为不同值控制数值显示位置，可选值有default（默认）right，inner

::: demo

```html

<template>
  <div flex="main:center">
    <bv-capsule-chart :config="config" style="width:300px;height:200px"></bv-capsule-chart>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        config: {
          data: [
            { name: '漯河', value: 167 },
            { name: '郑州', value: 68 },
            { name: '周口', value: 89 },
            { name: '濮阳', value: 98 },
            { name: '三门峡', value: 123 }
          ],
          colors: ['#e062ae', '#96bfff', '#e690d1', '#32c5e9', '#fb7293'],
          unit: '(条)',
          showValue: true,
          valuePosition: 'right'
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
| data   | 数据源，对象格式，{ name: '名称', value: '数值' },   | Array  |    —      |    []    |
| unit   | 单位   | String  |    —      |    —      |
| colors   | 主题色板   | Array  |    —      |  默认色     |
| showValue   | 是否显示数字   | Boolean  |    —      |  false     |
| valuePosition   | 数字显示位置   | String  |  right，inner     |  default     |
