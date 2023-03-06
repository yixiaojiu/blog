# 手写

## 数组去重

```ts
const deleteRepeat = (array: number[]) => Array.from(new Set(array))

const deleteRepeat = (array: number[]) =>
  array.filter((item, index) => array.indexOf(item) === index)

const deleteRepeat = (array: number[]) => {
  const res: number[] = []
  for (let i = 0; i < array.length; i++) {
    // 或者indexOf
    if (!res.includes(array[i])) {
      res.push(array[i])
    }
  }
  return res
}
```

## 数组扁平化

```js
const flat = (array) => array.toString().split(',')

const flat = (array) => array.join().split(',')

const flat = (array, depth = 1) => {
  const res = []
  for (const item of array) {
    if (Array.isArray(item) && depth > 0) {
      res.push(...flat(item, depth - 1))
    } else {
      res.push(item)
    }
  }
  return res
}
```

## 排序

### 冒泡排序

比较相邻的两个元素，较大的元素放到后面，每遍历一遍，将当前最大数放到最后

```js
const bubbleSort = (array) => {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        ;[array[j], array[j + 1]] = [array[j + 1], array[j]]
      }
    }
  }
  return array
}
```

### 选择排序

每遍历一次找到最小元素的下标，与起始位置交换

```js
const selectionSort = (array) => {
  let minIndex = 0
  for (let i = 0; i < array.length - 1; i++) {
    minIndex = i
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j
      }
    }
    if (minIndex !== i) {
      ;[array[i], array[minIndex]] = [array[minIndex], array[i]]
    }
  }
  return array
}
```

### 快速排序

> 参考 [排序算法:快速排序的理解与实现](https://juejin.cn/post/6844904122274185224)

选取基准值，比基准值小的放到左边数组，比基准值大的放到右边数组，在分别对左右数组进行递归排序

```js
const quickSort = (array) => {
  if (array.length < 2) return array
  const left = []
  const right = []
  const pivot = Math.floor(Math.random() * array.length)
  for (let i = 0; i < array.length; i++) {
    if (pivot !== i && array[i] >= array[pivot]) {
      right.push(array[i])
    }
    if (pivot !== i && array[i] < array[pivot]) {
      left.push(array[i])
    }
  }
  return [...quickSort(left), array[pivot], ...quickSort(right)]
}
```

原地快排

> 参考 [掘金](https://juejin.cn/post/7203714680316592188)

```js
const quickSort = (array) => {
  const sort = (left, right) => {
    if (left >= right) return

    const pivot = array[left]
    let i = left
    let j = right
    while (i < j) {
      while (i < j && array[j] >= pivot) j--
      if (i < j) {
        array[i] = array[j]
        i++
      }
      while (i < j && array[i] <= pivot) i++
      if (i < j) {
        array[j] = array[i]
        j--
      }
    }
    array[i] = pivot
    sort(left, i - 1)
    sort(i + 1, right)
  }
  sort(0, array.length - 1)
  return array
}
```
