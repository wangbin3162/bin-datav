/**
 * 精准判断对象类型
 * @param obj
 */
export function typeOf(obj) {
  const toString = Object.prototype.toString
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
  }
  return map[toString.call(obj)]
}

/**
 * 深拷贝
 * @param data
 */
export function deepCopy(data) {
  const t = typeOf(data)
  let o

  if (t === 'array') {
    o = []
  } else if (t === 'object') {
    o = {}
  } else {
    return data
  }

  if (t === 'array') {
    for (let i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]))
    }
  } else if (t === 'object') {
    for (const i in data) {
      o[i] = deepCopy(data[i])
    }
  }
  return o
}

/**
 * 深覆盖
 * @param target
 * @param merged
 */
export function deepMerge(target, merged) {
  for (const key in merged) {
    if (target[key] && typeof target[key] === 'object') {
      deepMerge(target[key], merged[key])
      continue
    }
    if (typeof merged[key] === 'object') {
      target[key] = deepCopy(merged[key])

      continue
    }
    target[key] = merged[key]
  }

  return target
}


/**
 * 节流函数，(限制函数的执行频率)返回函数连续调用时，空闲时间必须大于或等于 wait，func 才会执行
 * @param  {function} func        回调函数
 * @param  {number}   wait        表示时间窗口的间隔
 * @param immediate 是否立即执行 true 则先调用，false不先调用
 * @return {function}             返回客户调用函数
 */
export function throttle(func, wait, immediate) {
  let timeoutID
  let lastExec = 0

  function wrapper() {
    const self = this
    const elapsed = Number(new Date()) - lastExec
    const args = arguments

    function clearExistingTimeout() {
      if (timeoutID) {
        clearTimeout(timeoutID)
      }
    }

    function clear() {
      timeoutID = undefined
    }

    function exec() {
      lastExec = Number(new Date())
      func.apply(self, args)
    }

    if (immediate && !timeoutID) {
      exec()
    }
    clearExistingTimeout()
    if (immediate === undefined && elapsed > wait) {
      exec()
    } else {
      timeoutID = setTimeout(immediate ? clear : exec, immediate === undefined ? wait - elapsed : wait)
    }
  }

  return wrapper
}

/**
 * 防抖函数，(限制函数的执行频率) 保证再一系列调用时间内，只调用一次
 *
 * @param  {function} func        回调函数
 * @param  {number}   wait        表示时间窗口的间隔
 * @return {function}             返回客户调用函数
 */
export function debounce(func, wait) {
  return throttle(func, wait, false)
}

/**
 * 判断是否是对象或数组
 * @param obj
 * @returns {boolean}
 */
export function isObject(obj) {
  return typeof obj === 'object' && obj !== null
}

/**
 * 判定对象数组相等
 * @param obj1
 * @param obj2
 * @returns {boolean}
 */
export function isEqual(obj1, obj2) {
  // 两个数据有任何一个不是对象或数组
  if (!isObject(obj1) || !isObject(obj2)) {
    // 值类型(注意：参与equal的一般不会是函数)
    return obj1 === obj2
  }
  // 如果传的两个参数都是同一个对象或数组
  if (obj1 === obj2) {
    return true
  }

  // 两个都是对象或数组，而且不相等
  // 1.先比较obj1和obj2的key的个数，是否一样
  const obj1Keys = Object.keys(obj1)
  const obj2Keys = Object.keys(obj2)
  if (obj1Keys.length !== obj2Keys.length) {
    return false
  }

  // 如果key的个数相等,就是第二步
  // 2.以obj1为基准，和obj2依次递归比较
  for (let key in obj1) {
    // 比较当前key的value  --- 递归
    const res = isEqual(obj1[key], obj2[key])
    if (!res) {
      return false
    }
  }

  // 3.全相等
  return true
}

/**
 * 过滤数组数字
 * @param array
 * @returns {*}
 */
export function filterNonNumber(array) {
  return array.filter(n => typeof n === 'number')
}

/**
 * 数组数字求和
 * @param nums
 * @returns {*}
 */
export function mulAdd(nums) {
  const newNums = filterNonNumber(nums)
  return newNums.reduce((all, num) => all + num, 0)
}

/**
 * 合并相同的stack data
 * @param item
 * @param series
 * @returns {*[]}
 */
export function mergeSameStackData(item, series) {
  const stack = item.stack

  if (!stack) return [...item.data]

  const stacks = series.filter(({ stack: s }) => s === stack)

  const index = stacks.findIndex(({ data: d }) => d === item.data)

  const datas = stacks.splice(0, index + 1).map(({ data }) => data)

  const dataLength = datas[0].length

  return new Array(dataLength)
    .fill(0)
    .map((foo, i) => mulAdd(datas.map(d => d[i])))
}

/**
 * 获取两个点的距离
 * @param pointOne
 * @param pointTwo
 * @returns {number}
 */
export function getTwoPointDistance(pointOne, pointTwo) {
  const minusX = Math.abs(pointOne[0] - pointTwo[0])

  const minusY = Math.abs(pointOne[1] - pointTwo[1])

  return Math.sqrt(minusX * minusX + minusY * minusY)
}

/**
 * getLinearGradientColor
 * @param ctx
 * @param begin
 * @param end
 * @param color
 */
export function getLinearGradientColor(ctx, begin, end, color) {
  if (!ctx || !begin || !end || !color.length) return

  let colors = color

  typeof colors === 'string' && (colors = [color, color])

  const linearGradientColor = ctx.createLinearGradient(...begin, ...end)

  const colorGap = 1 / (colors.length - 1)

  colors.forEach((c, i) => linearGradientColor.addColorStop(colorGap * i, c))

  return linearGradientColor
}

/**
 * 获取折现长度
 * @param points
 * @returns {*}
 */
export function getPolylineLength(points) {
  const lineSegments = new Array(points.length - 1)
    .fill(0)
    .map((foo, i) => [points[i], points[i + 1]])

  const lengths = lineSegments.map(item => getTwoPointDistance(...item))

  return mulAdd(lengths)
}

/**
 * 获取点到线的距离
 * @param point
 * @param linePointOne
 * @param linePointTwo
 * @returns {number}
 */
export function getPointToLineDistance(point, linePointOne, linePointTwo) {
  const a = getTwoPointDistance(point, linePointOne)
  const b = getTwoPointDistance(point, linePointTwo)
  const c = getTwoPointDistance(linePointOne, linePointTwo)

  return 0.5 * Math.sqrt((a + b + c) * (a + b - c) * (a + c - b) * (b + c - a)) / c
}

/**
 * 初始化需要的charts series
 * @param series
 * @param config
 * @param type
 * @returns {*}
 */
export function initNeedSeries(series, config, type) {
  series = series.filter(({ type: st }) => st === type)

  series = series.map(item => deepMerge(deepCopy(config), item))

  return series.filter(({ show }) => show)
}

/**
 * 弧度转为角度
 * @param radian
 * @returns {number}
 */
export function radianToAngle(radian) {
  return radian / Math.PI * 180
}

/**
 * 随机一个数，需提供最大最小值
 * @param minNum
 * @param maxNum
 * @returns {number}
 */
export function randomExtend(minNum, maxNum) {
  if (arguments.length === 1) {
    return parseInt(Math.random() * minNum + 1, 10)
  } else {
    return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
  }
}

/**
 * @description Get the coordinates of the specified radian on the circle
 * @param {Number} x      Circle x coordinate
 * @param {Number} y      Circle y coordinate
 * @param {Number} radius Circle radius
 * @param {Number} radian Specfied radian
 * @return {Array} Postion of point
 */
export function getCircleRadianPoint(x, y, radius, radian) {
  return [x + Math.cos(radian) * radius, y + Math.sin(radian) * radius]
}

/**
 * 获取随机uuid
 */
export function generateId(hasHyphen) {
  const str = hasHyphen ? 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx' : 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'
  return str.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}
