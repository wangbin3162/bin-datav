## Flyline Chart 飞线图

飞线图较为常用，以往均为百度地图echarts作为底图，再拼接实际地理坐标位置，十分不方便，现修改为图层，坐标值均为相对位置 当前图只适用于简单不精确地图的飞线效果，如满足不了业务，则自行换用echarts实现即可

### 基本用法

::: demo 因文档开发原因，所有图片已存储为base64，只需在使用时将实际图片require至img属性中即可

```html

<template>
  <div class="flyline-chart-wrap">
    <bv-flyline-chart :config="config" style="width:100%;height:100%;"></bv-flyline-chart>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        config: {
          points: [
            { name: '徐州', coordinate: [0.67, 0.54] },
            { name: '北京', coordinate: [0.65, 0.40] },
            { name: '上海', coordinate: [0.71, 0.62] },
            { name: '南京', coordinate: [0.68, 0.59] },
            { name: '广州', coordinate: [0.61, 0.80] },
            { name: '黑龙江', coordinate: [0.75, 0.23] },
            { name: '郑州', coordinate: [0.59, 0.55] },
            { name: '荣成', coordinate: [0.69, 0.47] },
            { name: '青海', coordinate: [0.38, 0.50] },
            { name: '西藏', coordinate: [0.25, 0.62] },
            { name: '内蒙古', coordinate: [0.51, 0.39] },
            { name: '呼和浩特', coordinate: [0.19, 0.43] },
            { name: '海南', coordinate: [0.56, 0.88] },
            { name: '武汉', coordinate: [0.54, 0.65] },
            { name: '四川', coordinate: [0.46, 0.61] },
          ],
          lines: [
            { source: '徐州', target: '徐州' },
            { source: '北京', target: '徐州' },
            { source: '上海', target: '徐州' },
            { source: '南京', target: '徐州' },
            { source: '广州', target: '徐州' },
            { source: '黑龙江', target: '徐州' },
            { source: '郑州', target: '徐州' },
            { source: '荣成', target: '徐州' },
            { source: '青海', target: '徐州' },
            { source: '西藏', target: '徐州' },
            { source: '内蒙古', target: '徐州' },
            { source: '呼和浩特', target: '徐州' },
            { source: '海南', target: '徐州' },
            { source: '武汉', target: '徐州' },
            { source: '四川', target: '徐州' },
          ]
        }
      }
    }
  }
</script>
```

:::

### 附带点图标

可以附带点位图标，如需点击，请自行监听事件

::: demo 因文档开发原因，所有图片已存储为base64，只需在使用时将实际图片require至img属性中即可

```html

<template>
  <div class="flyline-chart-wrap">
    <bv-flyline-chart :config="config" style="width:100%;height:100%;"></bv-flyline-chart>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        config: {
          points: [
            {
              name: '徐州',
              coordinate: [0.67, 0.54],
              icon: {
                src: this.$images['mapCenter'],
                width: 30,
                height: 30
              }
            },
            { name: '北京', coordinate: [0.65, 0.40] },
            { name: '上海', coordinate: [0.71, 0.62] },
            { name: '南京', coordinate: [0.68, 0.59] },
            { name: '广州', coordinate: [0.61, 0.80] },
            { name: '黑龙江', coordinate: [0.75, 0.23] },
            { name: '郑州', coordinate: [0.59, 0.55] },
            { name: '荣成', coordinate: [0.69, 0.47] },
            { name: '青海', coordinate: [0.38, 0.50] },
            { name: '西藏', coordinate: [0.25, 0.62] },
            { name: '内蒙古', coordinate: [0.51, 0.39] },
            { name: '呼和浩特', coordinate: [0.19, 0.43] },
            { name: '海南', coordinate: [0.56, 0.88] },
            { name: '武汉', coordinate: [0.54, 0.65] },
            { name: '四川', coordinate: [0.46, 0.61] },
          ],
          lines: [
            { source: '徐州', target: '徐州' },
            { source: '北京', target: '徐州' },
            { source: '上海', target: '徐州' },
            { source: '南京', target: '徐州' },
            { source: '广州', target: '徐州' },
            { source: '黑龙江', target: '徐州' },
            { source: '郑州', target: '徐州' },
            { source: '荣成', target: '徐州' },
            { source: '青海', target: '徐州' },
            { source: '西藏', target: '徐州' },
            { source: '内蒙古', target: '徐州' },
            { source: '呼和浩特', target: '徐州' },
            { source: '海南', target: '徐州' },
            { source: '武汉', target: '徐州' },
            { source: '四川', target: '徐州' },
          ],
          icon: {
            show: true,
            src: this.$images['mapPoint'],
          },
        }
      }
    }
  }
</script>
```

:::

### 附带文本

可以附加文本显示

::: demo 因文档开发原因，所有图片已存储为base64，只需在使用时将实际图片require至img属性中即可

```html

<template>
  <div class="flyline-chart-wrap">
    <bv-flyline-chart :config="config" style="width:100%;height:100%;"></bv-flyline-chart>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        config: {
          points: [
            {
              name: '徐州',
              coordinate: [0.67, 0.54],
              icon: {
                src: this.$images['mapCenter'],
                width: 30,
                height: 30
              }
            },
            { name: '北京', coordinate: [0.65, 0.40] },
            { name: '上海', coordinate: [0.71, 0.62] },
            { name: '南京', coordinate: [0.68, 0.59] },
            { name: '广州', coordinate: [0.61, 0.80] },
            { name: '黑龙江', coordinate: [0.75, 0.23] },
            { name: '郑州', coordinate: [0.59, 0.55] },
            { name: '荣成', coordinate: [0.69, 0.47] },
            { name: '青海', coordinate: [0.38, 0.50] },
            { name: '西藏', coordinate: [0.25, 0.62] },
            { name: '内蒙古', coordinate: [0.51, 0.39] },
            { name: '呼和浩特', coordinate: [0.19, 0.43] },
            { name: '海南', coordinate: [0.56, 0.88] },
            { name: '武汉', coordinate: [0.54, 0.65] },
            { name: '四川', coordinate: [0.46, 0.61] },
          ],
          lines: [
            { source: '徐州', target: '徐州' },
            { source: '北京', target: '徐州' },
            { source: '上海', target: '徐州' },
            { source: '南京', target: '徐州' },
            { source: '广州', target: '徐州' },
            { source: '黑龙江', target: '徐州' },
            { source: '郑州', target: '徐州' },
            { source: '荣成', target: '徐州' },
            { source: '青海', target: '徐州' },
            { source: '西藏', target: '徐州' },
            { source: '内蒙古', target: '徐州' },
            { source: '呼和浩特', target: '徐州' },
            { source: '海南', target: '徐州' },
            { source: '武汉', target: '徐州' },
            { source: '四川', target: '徐州' },
          ],
          icon: {
            show: true,
            src: this.$images['mapPoint'],
          },
          text: {
            show: true
          }
        }
      }
    }
  }
</script>
```

:::

### 附带动画光圈

可以附带动画光圈

::: demo 因文档开发原因，所有图片已存储为base64，只需在使用时将实际图片require至img属性中即可

```html

<template>
  <div class="flyline-chart-wrap">
    <bv-flyline-chart :config="config" style="width:100%;height:100%;"></bv-flyline-chart>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        config: {
          points: [
            {
              name: '徐州',
              coordinate: [0.67, 0.54],
              halo: {
                show: true,
              },
              icon: {
                src: this.$images['mapCenter'],
                width: 30,
                height: 30
              }
            },
            { name: '北京', coordinate: [0.65, 0.40] },
            { name: '上海', coordinate: [0.71, 0.62] },
            { name: '南京', coordinate: [0.68, 0.59] },
            { name: '广州', coordinate: [0.61, 0.80] },
            { name: '黑龙江', coordinate: [0.75, 0.23] },
            { name: '郑州', coordinate: [0.59, 0.55] },
            { name: '荣成', coordinate: [0.69, 0.47] },
            { name: '青海', coordinate: [0.38, 0.50] },
            { name: '西藏', coordinate: [0.25, 0.62] },
            { name: '内蒙古', coordinate: [0.51, 0.39] },
            { name: '呼和浩特', coordinate: [0.19, 0.43] },
            { name: '海南', coordinate: [0.56, 0.88] },
            { name: '武汉', coordinate: [0.54, 0.65] },
            { name: '四川', coordinate: [0.46, 0.61] },
          ],
          lines: [
            { source: '徐州', target: '徐州' },
            { source: '北京', target: '徐州' },
            { source: '上海', target: '徐州' },
            { source: '南京', target: '徐州' },
            { source: '广州', target: '徐州' },
            { source: '黑龙江', target: '徐州' },
            { source: '郑州', target: '徐州' },
            { source: '荣成', target: '徐州' },
            { source: '青海', target: '徐州' },
            { source: '西藏', target: '徐州' },
            { source: '内蒙古', target: '徐州' },
            { source: '呼和浩特', target: '徐州' },
            { source: '海南', target: '徐州' },
            { source: '武汉', target: '徐州' },
            { source: '四川', target: '徐州' },
          ],
          icon: {
            show: true,
            src: this.$images['mapPoint'],
          },
          text: {
            show: true
          }
        }
      }
    }
  }
</script>
```

:::

### 凹聚显示

飞线凹聚显示

::: demo 因文档开发原因，所有图片已存储为base64，只需在使用时将实际图片require至img属性中即可

```html

<template>
  <div class="flyline-chart-wrap">
    <bv-flyline-chart :config="config" style="width:100%;height:100%;"></bv-flyline-chart>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        config: {
          points: [
            {
              name: '徐州',
              coordinate: [0.67, 0.54],
              halo: {
                show: true,
              },
              icon: {
                src: this.$images['mapCenter'],
                width: 30,
                height: 30
              }
            },
            { name: '北京', coordinate: [0.65, 0.40] },
            { name: '上海', coordinate: [0.71, 0.62] },
            { name: '南京', coordinate: [0.68, 0.59] },
            { name: '广州', coordinate: [0.61, 0.80] },
            { name: '黑龙江', coordinate: [0.75, 0.23] },
            { name: '郑州', coordinate: [0.59, 0.55] },
            { name: '荣成', coordinate: [0.69, 0.47] },
            { name: '青海', coordinate: [0.38, 0.50] },
            { name: '西藏', coordinate: [0.25, 0.62] },
            { name: '内蒙古', coordinate: [0.51, 0.39] },
            { name: '呼和浩特', coordinate: [0.19, 0.43] },
            { name: '海南', coordinate: [0.56, 0.88] },
            { name: '武汉', coordinate: [0.54, 0.65] },
            { name: '四川', coordinate: [0.46, 0.61] },
          ],
          lines: [
            { source: '徐州', target: '徐州' },
            { source: '北京', target: '徐州' },
            { source: '上海', target: '徐州' },
            { source: '南京', target: '徐州' },
            { source: '广州', target: '徐州' },
            { source: '黑龙江', target: '徐州' },
            { source: '郑州', target: '徐州' },
            { source: '荣成', target: '徐州' },
            { source: '青海', target: '徐州' },
            { source: '西藏', target: '徐州' },
            { source: '内蒙古', target: '徐州' },
            { source: '呼和浩特', target: '徐州' },
            { source: '海南', target: '徐州' },
            { source: '武汉', target: '徐州' },
            { source: '四川', target: '徐州' },
          ],
          icon: {
            show: true,
            src: this.$images['mapPoint'],
          },
          k: 0.6,
          text: {
            show: true
          }
        }
      }
    }
  }
</script>
```

:::

### 其他配置

可以利用不同配置，灵活组装出好看的飞线图

::: demo 因文档开发原因，所有图片已存储为base64，只需在使用时将实际图片require至img属性中即可

```html

<template>
  <div class="flyline-chart-wrap">
    <bv-flyline-chart :config="config" style="width:100%;height:100%;" @click="onClick"></bv-flyline-chart>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        config: {
          points: [
            {
              name: '徐州',
              coordinate: [0.67, 0.54],
              halo: {
                show: true,
              },
              icon: {
                src: this.$images['mapCenter'],
                width: 30,
                height: 30
              }
            },
            {
              name: '北京',
              coordinate: [0.65, 0.40],
              halo: {
                show: true,
                color: '#8378ea'
              }
            },
            { name: '上海', coordinate: [0.71, 0.62] },
            { name: '南京', coordinate: [0.68, 0.59] },
            { name: '广州', coordinate: [0.61, 0.80] },
            { name: '黑龙江', coordinate: [0.75, 0.23] },
            {
              name: '郑州',
              coordinate: [0.59, 0.55],
              halo: {
                show: true,
                color: '#37a2da'
              }
            },
            { name: '荣成', coordinate: [0.69, 0.47] },
            { name: '青海', coordinate: [0.38, 0.50] },
            { name: '西藏', coordinate: [0.25, 0.62] },
            { name: '内蒙古', coordinate: [0.51, 0.39] },
            { name: '呼和浩特', coordinate: [0.19, 0.43] },
            { name: '海南', coordinate: [0.56, 0.88] },
            { name: '武汉', coordinate: [0.54, 0.65] },
            { name: '四川', coordinate: [0.46, 0.61] },
          ],
          lines: [
            { source: '徐州', target: '徐州' },
            { source: '北京', target: '徐州', color: '#fb7293', width: 2 },
            { source: '上海', target: '徐州', color: '#8378ea' },
            { source: '南京', target: '徐州', color: '#8378ea' },
            { source: '广州', target: '徐州' },
            { source: '黑龙江', target: '徐州' },
            { source: '郑州', target: '徐州', color: '#fb7293', width: 2 },
            { source: '荣成', target: '徐州', color: '#8378ea' },
            { source: '青海', target: '徐州' },
            { source: '西藏', target: '徐州', color: '#8378ea' },
            { source: '内蒙古', target: '徐州' },
            { source: '呼和浩特', target: '徐州' },
            { source: '海南', target: '徐州' },
            { source: '武汉', target: '徐州', color: '#37a2da' },
            { source: '四川', target: '徐州' },
          ],
          icon: {
            show: true,
            src: this.$images['mapPoint'],
          },
          text: {
            show: true
          }
        }
      }
    },
    methods: {
      onClick(point) {
        this.$message(`点击了${point.name}`)
      }
    }
  }
</script>
```

:::

### dev

组件默认提供了一个dev模式，直接设置dev=true则可以在控制台点击区域，快速获得点位位置。

### Props

| 参数     | 说明    | 类型      | 可选值       | 默认值   |
|----------|-------- |---------- |-------------  |-------- |
| config   | 定义的config配置项，主要包含下面几个属性值   | Object  |    —      |     {}     |

### config

| 参数     | 说明    | 类型      | 可选值       | 默认值   |
|----------|-------- |---------- |-------------  |-------- |
| points   | 飞线点 点位内容建Point  | Array  |    —      |    []    |
| lines   | 飞线 ，飞线内容建Flyline  | Array  |    —      |    []    |
| halo   | 全局光晕配置   | Halo  |    —      |  —    |
| text   | 全局文本配置   | Text  |    —      |  —     |
| icon   | 全局图标配置   | Icon  |    —      |   —     |
| line   | 全局飞线配置   | Line  |    —      |  #fff   |
| bgImgSrc   | 背景图src   | String  |    —      |  —    |
| k   | 飞线收束成都   | Number  |   -1 ~ 1      |   -0.5    |
| curvature   | 飞线曲率   | Number  |   1 ~ 10      |   5    |
| relative   | 相对坐标   | Boolean  |   true、false     |   true    |

### Point 属性

halo、text、icon属性都会自动继承该属性的全局配置。

| 参数     | 说明    | 类型      | 可选值       | 默认值   |
|----------|-------- |---------- |-------------  |-------- |
| name   | 点名称  | String  |    —      |  —     |
| coordinate   | 点坐标  | Number[]  |    —      |  —     |
| halo   | 光晕配置   | Halo  |    —      |  —    |
| text   | 文本配置   | Text  |    —      |  —     |
| icon   | 图标配置   | Icon  |    —      |   —     |

### Flyline 属性

每个Flyline的width、color、orbitColor、duration、radius属性都会自动继承config.line下相同的属性配置。

| 参数     | 说明    | 类型      | 可选值       | 默认值   |
|----------|-------- |---------- |-------------  |-------- |
| source   | 起点的名称  | String  |    —      |  —     |
| target   | 飞线终点名称  | Number[]  |    —      |  —     |
| width   | 飞线宽度   | Number  |    —      |  1   |
| color   | 飞线颜色   | String  |    —      | '#ffde93'    |
| orbitColor   | 飞线轨迹颜色 ，如想要隐藏，则可设置为transparent  | String  |    —      |  'rgba(103, 224, 227, .2)'   |
| duration   | 飞线动画时长，计算动画时长，第一个控制最短时长，第二个控制最长事件，10 = 1s   | Number[]  |    —      | [20, 30]  |
| radius   | 飞线显示半径 ,飞线的长度范围，值越大，飞线越长  | Number[]  |    —      | 100 |

### halo 属性

| 参数     | 说明    | 类型      | 可选值       | 默认值   |
|----------|-------- |---------- |-------------  |-------- |
| show   | 是否显示光晕  | Boolean  |    —      | false  |
| duration   | 动画时长，参考上方，依然为2个值  | Number[]   |    —      | [20, 30]  |
| color   | 光晕颜色  | String  |    —      |  #fb7293  |
| radius   | 最大光晕半径  | Number  |    —      |  120  |

### text 属性

| 参数     | 说明    | 类型      | 可选值       | 默认值   |
|----------|-------- |---------- |-------------  |-------- |
| show   | 是否显示点名称  | Boolean  |    —      | false  |
| offset   | 名称位置偏移，2个值的数组  | Number[]  |    —      | [0,15]  |
| color   | 名称颜色  | String  |    —      |  #ffdb5c  |
| fontSize   | 名称文字大小  | Number  |    —      |  #12  |

### icon 属性

| 参数     | 说明    | 类型      | 可选值       | 默认值   |
|----------|-------- |---------- |-------------  |-------- |
| show   | 是否显示点图标  | Boolean  |    —      | false  |
| src   | 图标src  | String  |    —      | ''  |
| width   | 图标宽度  | Number  |    —      | 15 |
| height   | 图标高度  | Number  |    —      | 15 |

### line 属性

| 参数     | 说明    | 类型      | 可选值       | 默认值   |
|----------|-------- |---------- |-------------  |-------- |
| width   | 飞线宽度/粗细  | Number  |    —      | 1 |
| color   | 飞线颜色   | String  |    —      | '#ffde93'    |
| orbitColor   | 飞线轨迹颜色 ，如想要隐藏，则可设置为transparent  | String  |    —      |  'rgba(103, 224, 227, .2)'   |
| duration   | 飞线动画时长，计算动画时长，第一个控制最短时长，第二个控制最长事件，10 = 1s   | Number[]  |    —      | [20, 30]  |
| radius   | 飞线显示半径 ,飞线的长度范围，值越大，飞线越长  | Number[]  |    —      | 100 |
