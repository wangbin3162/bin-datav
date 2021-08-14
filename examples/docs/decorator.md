## Decorator 装饰器

提供一些装饰器，用于点缀页面内容，以达到更好的视觉效果，但这里不推荐过多使用，过度使用会使页面性能降低并显得杂乱无章

### decorator1 类型

::: demo

```html

<template>
  <div class="decoration-container">
    <bv-decorator name="decorator1" style="width:200px;height:50px;"></bv-decorator>
  </div>
</template>
```

:::

### decorator2 类型

可以设置`dur`动画时长,动画时长默认6s
::: demo

```html

<template>
  <div class="decoration-container">
    <bv-decorator name="decorator2" :dur="2" style="width:200px;height:5px;"></bv-decorator>
  </div>
</template>
```

:::

### Props

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| name     | 必填，填写对应文档的border名称   | String  |    —      |       —     |
| color   | 自定义颜色，可输入两个颜色，主色和副色   | string[]  |    —       |   —     |

### Function

| 事件名      | 说明    | 返回值      |
|---------- |-------- |---------- |
| resize     | 刷新事件   | 无  |
