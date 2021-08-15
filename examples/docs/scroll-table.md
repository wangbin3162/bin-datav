## ScrollTable 轮播表格

考虑业务中数据可视化显示时，表格可展示的区域有限，因此需要滚动显示

### 基础用法

::: demo

```html

<template>
  <div flex="main:center">
    <bv-scroll-table :config="config" style="width: 500px; height: 200px;"></bv-scroll-table>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        config: {
          data: [
            ['行1列1', '行1列2', '行1列3'],
            ['行2列1', '行2列2', '行2列3'],
            ['行3列1', '行3列2', '行3列3'],
            ['行4列1', '行4列2', '行4列3'],
            ['行5列1', '行5列2', '行5列3'],
            ['行6列1', '行6列2', '行6列3'],
            ['行7列1', '行7列2', '行7列3'],
            ['行8列1', '行8列2', '行8列3'],
            ['行9列1', '行9列2', '行9列3'],
            ['行10列1', '行10列2', '行10列3']
          ]
        }
      }
    }
  }
</script>
```

:::

### 附加表头

::: demo

```html

<template>
  <div flex="main:center">
    <bv-scroll-table :config="config" style="width: 500px; height: 200px;"></bv-scroll-table>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        config: {
          header: ['列1', '列2', '列3'],
          data: [
            ['行1列1', '行1列2', '行1列3'],
            ['行2列1', '行2列2', '行2列3'],
            ['行3列1', '行3列2', '行3列3'],
            ['行4列1', '行4列2', '行4列3'],
            ['行5列1', '行5列2', '行5列3'],
            ['行6列1', '行6列2', '行6列3'],
            ['行7列1', '行7列2', '行7列3'],
            ['行8列1', '行8列2', '行8列3'],
            ['行9列1', '行9列2', '行9列3'],
            ['行10列1', '行10列2', '行10列3']
          ]
        }
      }
    }
  }
</script>
```

:::

### 附加行号

::: demo

```html

<template>
  <div flex="main:center">
    <bv-scroll-table :config="config" style="width: 500px; height: 200px;"></bv-scroll-table>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        config: {
          header: ['列1', '列2', '列3'],
          data: [
            ['行1列1', '行1列2', '行1列3'],
            ['行2列1', '行2列2', '行2列3'],
            ['行3列1', '行3列2', '行3列3'],
            ['行4列1', '行4列2', '行4列3'],
            ['行5列1', '行5列2', '行5列3'],
            ['行6列1', '行6列2', '行6列3'],
            ['行7列1', '行7列2', '行7列3'],
            ['行8列1', '行8列2', '行8列3'],
            ['行9列1', '行9列2', '行9列3'],
            ['行10列1', '行10列2', '行10列3']
          ],
          index: true,
          columnWidth: [50],
          align: ['center']
        }
      }
    }
  }
</script>
```

:::

### 整页滚动

::: demo

```html

<template>
  <div flex="main:center">
    <bv-scroll-table :config="config" style="width: 500px; height: 200px;"></bv-scroll-table>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        config: {
          header: ['列1', '列2', '列3'],
          data: [
            ['行1列1', '行1列2', '行1列3'],
            ['行2列1', '行2列2', '行2列3'],
            ['行3列1', '行3列2', '行3列3'],
            ['行4列1', '行4列2', '行4列3'],
            ['行5列1', '行5列2', '行5列3'],
            ['行6列1', '行6列2', '行6列3'],
            ['行7列1', '行7列2', '行7列3'],
            ['行8列1', '行8列2', '行8列3'],
            ['行9列1', '行9列2', '行9列3'],
            ['行10列1', '行10列2', '行10列3']
          ],
          index: true,
          columnWidth: [50],
          align: ['center'],
          carousel: 'page'
        }
      }
    }
  }
</script>
```

:::

### 定制各种元素

可以定制各种属性显示，并监听事件

::: demo

```html

<template>
  <div flex="main:center">
    <bv-scroll-table :config="config" style="width: 500px; height: 200px;" @click="handleClick"></bv-scroll-table>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        config: {
          header: ['列1', '列2', '列3'],
          data: [
            ['<span style="color:#37a2da;">行1列1</span>', '行1列2', '行1列3'],
            ['行2列1', '<span style="color:#32c5e9;">行2列2</span>', '行2列3'],
            ['行3列1', '行3列2', '<span style="color:#67e0e3;">行3列3</span>'],
            ['行4列1', '<span style="color:#9fe6b8;">行4列2</span>', '行4列3'],
            ['<span style="color:#ffdb5c;">行5列1</span>', '行5列2', '行5列3'],
            ['行6列1', '<span style="color:#ff9f7f;">行6列2</span>', '行6列3'],
            ['行7列1', '行7列2', '<span style="color:#fb7293;">行7列3</span>'],
            ['行8列1', '<span style="color:#e062ae;">行8列2</span>', '行8列3'],
            ['<span style="color:#e690d1;">行9列1</span>', '行9列2', '行9列3'],
            ['行10列1', '<span style="color:#e7bcf3;">行10列2</span>', '行10列3']
          ],
          index: true,
          columnWidth: [50],
          align: ['center'],
        }
      }
    },
    methods: {
      handleClick({ row, cell, rowIndex, columnIndex }) {
        console.log({ row, cell, rowIndex, columnIndex })
        this.$message(`点击了第${rowIndex}行第${columnIndex}列`)
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

columnWidth与align允许尾部缺省：

| 参数     | 说明    | 类型      | 可选值       | 默认值   |
|----------|-------- |---------- |-------------  |-------- |
| header   | 表头数据   | Array  |    —      |    []    |
| data   | 表数据   | Array  |    —      |  []      |
| rowNum | 表行数   | Number  |    —      |  5    |
| headerBGC   | 表头背景色   | String  |   —      | '#00BAFF'    |
| oddRowBGC   | 奇数行背景色   | String  |   —      | '#003B51'   |
| evenRowBGC   | 偶数行背景色   | String  |   —      | '#0A2732'    |
| waitTime   | 轮播时间间隔(ms)   | Number  |   —      | 2000 |
| headerHeight   | 表头高度   | Boolean  |   —      | 35  |
| columnWidth   | 列宽度 ，columnWidth可以配置每一列的宽度，默认情况下每一列宽度相等。如输入的列不足，则剩余的补足  | Array  |   —      |   []   |
| align   | 列对齐方式 ，align可以配置每一列的对齐方式，默认值为'left'  | String  |  'left'，'center'，'right'     |  'left'   |
| index   | 显示行号   | Boolean  |  true|false         |   false   |
| indexHeader   | 行号表头   | String  |  —       | '#' |
| carousel   | 轮播方式   | String  |  'single'|'page'         |  'single'   |
| hoverPause   | 悬浮暂停轮播   | Boolean  |  true|false         |   true   |
