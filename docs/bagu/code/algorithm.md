# 算法

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

### 堆排序

大顶堆（Max Heap）性质：

- 对于任意节点 i，节点 i 的值大于或等于其左右子节点的值。
- 二叉树的根节点是堆中的最大值。

```js
function heapSort(arr) {
  // 构建大顶堆
  buildHeap(arr)

  // 从最后一个非叶子节点开始进行堆调整
  for (let i = arr.length - 1; i > 0; i--) {
    // 将堆顶元素（最大值）与当前未排序部分的最后一个元素交换
    swap(arr, 0, i)

    // 对交换后的堆进行调整，使其满足大顶堆的性质
    heapify(arr, 0, i)
  }

  return arr
}

// 构建大顶堆
function buildHeap(arr) {
  const len = arr.length
  // 从最后一个非叶子节点开始，依次进行堆调整
  for (let i = Math.floor(len / 2) - 1; i >= 0; i--) {
    heapify(arr, i, len)
  }
}

// 堆调整
function heapify(arr, i, len) {
  const left = 2 * i + 1
  const right = 2 * i + 2
  let largest = i

  // 找到左子节点和右子节点中的最大值
  if (left < len && arr[left] > arr[largest]) {
    largest = left
  }
  if (right < len && arr[right] > arr[largest]) {
    largest = right
  }

  // 如果最大值不是当前节点，交换最大值和当前节点的位置，并继续向下调整
  if (largest !== i) {
    swap(arr, i, largest)
    heapify(arr, largest, len)
  }
}

// 交换数组中两个元素的位置
function swap(arr, i, j) {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}
```

## 二叉树

二叉搜索树的中序遍历有序

### 前中后序遍历

区别是消费数据的位置

```js
// 前序遍历：
var preorderTraversal = function (root) {
  const dfs = function (node) {
    if (node === null) return
    console.log(node.value)
    dfs(node.left)
    dfs(node.right)
  }
  dfs(root)
  return res
}

// 中序遍历：
var inorderTraversal = function (root) {
  const dfs = function (node) {
    if (node === null) return
    dfs(node.left)
    console.log(node.value)
    dfs(node.right)
  }
  dfs(root)
  return res
}

// 后序遍历：
var postorderTraversal = function (root) {
  const dfs = function (node) {
    if (node === null) return
    dfs(node.left)
    dfs(node.right)
    console.log(node.value)
  }
  dfs(root)
  return res
}
```

### 层序遍历

```js
var averageOfLevels = function (root) {
  let queue = []
  queue.push(root)

  while (queue.length && root !== null) {
    //每一层节点个数
    let length = queue.length
    for (let i = 0; i < length; i++) {
      let node = queue.shift()
      console.log(node.value)
      node.left && queue.push(node.left)
      node.right && queue.push(node.right)
    }
  }

  return res
}
```

## 回溯

### 组合

[1, n] 中所有可能的 k 个数的组合

```js
var combine = function (n, k) {
  const result = []
  const path = []
  const backtracking = (n, k, startIndex) => {
    if (path.length === k) {
      result.push([...path])
      return
    }
    for (let i = startIndex; i <= n - (k - path.length) + 1; i++) {
      path.push(i)
      backtracking(n, k, i + 1)
      path.pop()
    }
  }
  backtracking(n, k, 1)
  return result
}
```

### 排列

```ts
function permute(nums: number[]): number[][] {
  const length = nums.length
  const result: number[][] = []
  const path: number[] = []
  backtracking()
  function backtracking() {
    if (path.length === length) {
      result.push([...path])
      return
    }
    for (let i = 0; i < length; i++) {
      if (!path.includes(nums[i])) {
        path.push(nums[i])
        backtracking()
        path.pop()
      }
    }
  }
  return result
}
```

## LRU

- 执行 get 时，需要将值更新为最近使用
- 执行 put 时，需要将插入的值设置为最近使用。如果容量已满，需要删除许久未使用的值

[引用 LeetCode](https://leetcode.cn/problems/lru-cache/solution/146-lru-huan-cun-liang-chong-shi-xian-1l-ccws/)

利用 Map 存储插入循序的特性

```js
/**
 * @param {number} capacity
 */
const LRUCache = function (capacity) {
  this.capacity = capacity
  this.map = new Map()
}

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  if (this.map.has(key)) {
    const value = this.map.get(key)
    this.map.delete(key)
    this.map.set(key, value)
    return value
  } else {
    return -1
  }
}

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  this.map.delete(key)
  this.map.set(key, value)
  if (this.map.size > this.capacity) {
    this.map.delete(this.map.keys().next().value)
  }
}
```

## 01背包

有n件物品和一个最多能背重量为w 的背包。第i件物品的重量是weight[i]，得到的价值是value[i] 。每件物品只能用一次，求解将哪些物品装入背包里物品价值总和最大。

递推公式： ` dp[i][j] = max(dp[i - 1][j], dp[i - 1][j - weight[i]] + value[i]);`
