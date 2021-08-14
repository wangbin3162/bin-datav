## BorderBox 边框盒子

边框盒子较为常用，这里收录多个不同种类的边框容器以供选择，边框这里的边框由给定的svg构成，且支持宽高自适应。

### border1 类型

::: demo

```html

<template>
  <div style="width: 100%;height:300px;">
    <bv-border-box name="border1">bv-border-box name="border1"</bv-border-box>
  </div>
</template>
```

:::

### border2 类型

::: demo

```html

<template>
  <div style="width: 100%;height:300px;">
    <bv-border-box name="border2">bv-border-box name="border2"</bv-border-box>
  </div>
</template>
```

:::

### border3 类型

::: demo

```html

<template>
  <div style="width: 100%;height:300px;">
    <bv-border-box name="border3">bv-border-box name="border3"</bv-border-box>
  </div>
</template>
```

:::

### border4 类型

::: demo

```html

<template>
  <div style="width: 100%;height:300px;">
    <bv-border-box name="border4">bv-border-box name="border4"</bv-border-box>
  </div>
</template>
```

:::

### border5 类型

::: demo

```html

<template>
  <div style="width: 100%;height:300px;">
    <bv-border-box name="border5">bv-border-box name="border5"</bv-border-box>
  </div>
</template>
```

:::

### border6 类型

::: demo

```html

<template>
  <div style="width: 100%;height:300px;">
    <bv-border-box name="border6">bv-border-box name="border6"</bv-border-box>
  </div>
</template>
```

:::

### border7 类型

::: demo

```html

<template>
  <div style="width: 100%;height:300px;">
    <bv-border-box name="border7">bv-border-box name="border7"</bv-border-box>
  </div>
</template>
```

:::

### border8 类型

8类型可以设置单次动画时长`dur` ，默认为3秒，也可以设置`reverse`来进行翻转

::: demo

```html

<template>
  <div style="width: 100%;height:300px;">
    <bv-border-box name="border8">bv-border-box name="border8"</bv-border-box>
  </div>
</template>
```

:::

### border9 类型

::: demo

```html

<template>
  <div style="width: 100%;height:300px;">
    <bv-border-box name="border9">bv-border-box name="border9"</bv-border-box>
  </div>
</template>
```

:::

### border10 类型

::: demo

```html

<template>
  <div style="width: 100%;height:300px;">
    <bv-border-box name="border10">bv-border-box name="border10"</bv-border-box>
  </div>
</template>
```

:::

### border11 类型

11类型可以设置`title`标题显示，并可以通过设置`title-width`来设置标题宽度

::: demo

```html

<template>
  <div style="width: 100%;height:300px;">
    <bv-border-box name="border11" title="我是标题" :title-width="180">bv-border-box name="border11"</bv-border-box>
  </div>
</template>
```

:::

### border12 类型

::: demo

```html

<template>
  <div style="width: 100%;height:300px;">
    <bv-border-box name="border12">bv-border-box name="border12"</bv-border-box>
  </div>
</template>
```

:::

### border13 类型

::: demo

```html

<template>
  <div style="width: 100%;height:300px;">
    <bv-border-box name="border13">bv-border-box name="border13"</bv-border-box>
  </div>
</template>
```

:::

### Props

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| name     | 必填，填写对应文档的border名称   | String  |    —      |       —     |
| color   | 自定义颜色，可输入两个颜色，主色和副色   | string[]  |    —       |   —     |
| backgroundColor     | 背景填充色   | String  |    —      |     transparent   |
| reverse | border8独有，是否翻转动画   | Boolean  |    —      |     false   |
| dur     | border8独有，动画时长    | Number  |    —      |     3s   |
| title      | border11独有，标题文字    | String  |    —      |    —   |
| titleWidth | border11独有，标题文字宽度    | Number  |    —      |   250  |

### Function

| 事件名      | 说明    | 返回值      |
|---------- |-------- |---------- |
| resize     | 刷新事件   | 无  |
