# 开发心得

## 业务

在面对功能不明确的产品，如何抓住主要矛盾（实现大致的功能），快速开发，忽略次要矛盾（比如：UI）

因为产品形态不明确，如何保证可扩展性

## 根据不同的 state 渲染不同的组件

例如：根据不同的卡片类型，渲染不同的卡片

```tsx
type CardType = 'red' | 'blue'
interface Props {
  type: CardType
}
const Card = ({ type }: Props) => {
  switch (type) {
    case 'red':
      return <RedCard />
    case 'blue':
      return <BlueCard />
    default:
      return null
  }
}

const App = () => {
  const [cardType] = useState<CardType>('red')

  return (
    <div>
      <Card type={cardType} />
    </div>
  )
}
```

而不是这样

```tsx
type CardType = 'red' | 'blue'
const App = () => {
  const [cardType] = useState<CardType>('red')
  return <div>{cardType === 'red' ? <RedCard /> : <BlueCard />}</div>
}
```

## state 操作不当的bug

```tsx
import { useState } from 'react'

interface Props {
  defalutList: number[]
}

const Component = ({ defalutList }: Props) => {
  const [list, setList] = useState(defalutList)

  const onChange = (value: number, index: number) => {
    // 导致 defalutList 被修改
    list[index] = value
    setList([...list])
  }

  return <Select onChange={onChange} />
}
```
