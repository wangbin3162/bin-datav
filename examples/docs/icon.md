## Icon 基础图标

图标组件依赖icon

### 基础用法

基础的图标用法

::: demo

```html

<template>
  <div>
    <bv-icon icon="appstore"></bv-icon>
    <bv-icon icon="bulb"></bv-icon>
    <bv-icon icon="edit-square"></bv-icon>
    <bv-icon icon="tags"></bv-icon>
    <bv-icon icon="heart"></bv-icon>
    <bv-icon icon="smile"></bv-icon>
  </div>
</template>
```

:::

### 附加颜色

基础的图标用法

::: demo

```html

<template>
  <div>
    <bv-icon icon="appstore" color="primary"></bv-icon>
    <bv-icon icon="bulb" color="success"></bv-icon>
    <bv-icon icon="edit-square" color="warning"></bv-icon>
    <bv-icon icon="heart" color="danger"></bv-icon>
    <bv-icon icon="smile" color="#25bbe3"></bv-icon>
  </div>
</template>
```

:::

### 设置大小和背景色

基础的图标用法

::: demo

```html

<template>
  <div>
    <p>
      <bv-icon icon="appstore" color="primary" :size="30" bg></bv-icon>
      <bv-icon icon="bulb" color="success" :size="30" bg></bv-icon>
      <bv-icon icon="edit-square" color="warning" :size="30" bg></bv-icon>
      <bv-icon icon="heart" color="danger" :size="30" bg></bv-icon>
      <bv-icon icon="smile" color="#25bbe3" :size="30" bg></bv-icon>
      <b-divider type="vertical"></b-divider>
      <bv-icon icon="appstore" color="primary" :size="30" bg round></bv-icon>
      <bv-icon icon="bulb" color="success" :size="30" bg round></bv-icon>
      <bv-icon icon="edit-square" color="warning" :size="30" bg round></bv-icon>
      <bv-icon icon="heart" color="danger" :size="30" bg round></bv-icon>
      <bv-icon icon="smile" color="#25bbe3" :size="30" bg round></bv-icon>
    </p>
    <p>
      <bv-icon icon="appstore" color="primary" :size="40" bg round></bv-icon>
      <bv-icon icon="bulb" color="success" :size="40" bg round></bv-icon>
      <bv-icon icon="edit-square" color="warning" :size="40" bg round></bv-icon>
      <bv-icon icon="heart" color="danger" :size="40" bg round></bv-icon>
      <bv-icon icon="smile" color="#25bbe3" :size="40" bg round></bv-icon>
      <b-divider type="vertical"></b-divider>
      <bv-icon icon="appstore" color="primary" :size="40"></bv-icon>
      <bv-icon icon="bulb" color="success" :size="40"></bv-icon>
      <bv-icon icon="edit-square" color="warning" :size="40"></bv-icon>
      <bv-icon icon="heart" color="danger" :size="40"></bv-icon>
      <bv-icon icon="smile" color="#25bbe3" :size="40"></bv-icon>
    </p>
  </div>
</template>
```

:::

### 可点击

基础的图标用法

::: demo

```html

<template>
  <div>
    <bv-icon icon="appstore" color="primary" :size="30" bg round @click="clickFunc" type="btn"></bv-icon>
    <bv-icon icon="bulb" color="success" :size="30" bg round @click="clickFunc" type="btn"></bv-icon>
    <bv-icon icon="edit-square" color="warning" :size="30" bg round @click="clickFunc" type="btn"></bv-icon>
    <bv-icon icon="heart" color="danger" :size="30" bg round @click="clickFunc" type="btn"></bv-icon>
    <bv-icon icon="smile" color="#25bbe3" :size="30" bg round @click="clickFunc" type="btn"></bv-icon>
  </div>
</template>
<script>
  export default {
    name: 'CompIconfont',
    methods: {
      clickFunc(icon) {
        this.$message.info(`点击了图标:${icon}`)
      }
    }
  }
</script>
```

:::

### Props

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| icon   | 图标名称，基于iconfont，或取自bin-ui-next   | String  |    —       |   —     |
| color     | 图标颜色   | String  |   primary，success，warning，danger，或自定义颜色值      |     —   |
| size   | 默认图标大小   | Number  |   —   |    32      |
| alpha   | 背景色透明度   | Number  |   —   |    0.2      |
| bg     | 是否显示背景图   | Boolean  |   —     |    false      |
| round     | 是否是圆形图标背景   | Boolean  |   —    |   false    |
| type     | 图标类型   | String  |   btn    |   —      |

### Events

| 事件名      | 说明    | 返回值      |
|---------- |-------- |---------- |
| click     | 点击事件，当type==='btn'时可用   | 无  |
