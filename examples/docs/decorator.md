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

可以设置`dur`动画时长,动画时长默认3s
::: demo

```html

<template>
  <div class="decoration-container">
    <bv-decorator name="decorator2" :dur="2" style="width:200px;height:5px;"></bv-decorator>
  </div>
</template>
```

:::

### decorator3 类型

可以设置`dur`动画时长,动画时长默认3s
::: demo

```html

<template>
  <div class="decoration-container">
    <bv-decorator name="decorator3" style="width:250px;height:30px;"></bv-decorator>
  </div>
</template>
```

:::

### decorator4 类型

::: demo

```html

<template>
  <div class="decoration-container">
    <bv-decorator name="decorator4" style="width:250px;height:5px;"></bv-decorator>
  </div>
</template>
```

:::

### decorator5 类型

::: demo

```html

<template>
  <div class="decoration-container">
    <bv-decorator name="decorator5" style="width:300px;height:40px;"></bv-decorator>
  </div>
</template>
```

:::

### decorator6 类型

::: demo

```html

<template>
  <div class="decoration-container">
    <bv-decorator name="decorator6" style="width:300px;height:30px;"></bv-decorator>
  </div>
</template>
```

:::

### decorator7 类型

::: demo

```html

<template>
  <div class="decoration-container">
    <bv-decorator name="decorator7" style="width:180px;height:30px;font-size: 16px;">Decorator Title</bv-decorator>
  </div>
</template>
```

:::

### decorator8 类型

8 类型可以设置 `reverse` 来进行翻转，以设置对称效果

::: demo

```html

<template>
  <div class="decoration-container">
    <bv-decorator name="decorator8" style="width:300px;height:50px;"></bv-decorator>
    &nbsp;
    <bv-decorator name="decorator8" reverse style="width:300px;height:50px;"></bv-decorator>
  </div>
</template>
```

:::

### decorator9 类型

::: demo

```html

<template>
  <div class="decoration-container" style="height:150px;">
    <bv-decorator
        name="decorator9"
        style="width:150px;height:150px;color: #7ec699;font-weight: 700;font-size: 28px;text-shadow: 0 0 3px #7acaec;"
    >60%
    </bv-decorator>
  </div>
</template>
```

:::

### decorator10 类型

可以设置`dur`动画时长,动画时长默认3s
::: demo

```html

<template>
  <div class="decoration-container">
    <bv-decorator name="decorator10" :dur="1" style="width:90%;height:5px;"></bv-decorator>
  </div>
</template>
```

:::

### decorator11 类型

::: demo

```html

<template>
  <div class="decoration-container">
    <bv-decorator name="decorator11" style="width:200px;height:60px;">Decorator Title</bv-decorator>
  </div>
</template>
```

:::

### decorator12 类型

设置 `scanDur` 扫描动画时长，默认3s，设置 `haloDur` 波纹动画时长, 默认2s
::: demo

```html

<template>
  <div class="decoration-container" style=";height:150px;">
    <bv-decorator name="decorator12" style="width:150px;height:150px;"></bv-decorator>
  </div>
</template>
```

:::

### Props

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| name     | 必填，填写对应文档的border名称   | String  |    —      |       —     |
| color   | 自定义颜色，可输入两个颜色，主色和副色   | string[]  |    —       |   —     |
| reverse | decorator8独有，是否翻转动画   | Boolean  |    —      |     false   |
| dur     | 动画时长 ，参考文档中标记哪个可以使用   | Number  |    —      |     3s   |
| scanDur | decorator12独有，扫描动画时长    | String  |    —      |    3s   |
| haloDur | decorator12独有，波纹动画时长    | Number  |    —      |   2s  |

### Function

| 事件名      | 说明    | 返回值      |
|---------- |-------- |---------- |
| resize     | 刷新事件   | 无  |
