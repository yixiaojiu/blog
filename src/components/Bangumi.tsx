import { defineCustomElements } from 'bilibili-bangumi-component/loader'

defineCustomElements()

export function Bangumi() {
  return (
    // @ts-expect-error
    <bilibili-bangumi api="https://bangumi-api.yixiaojiu.top/api"></bilibili-bangumi>
  )
}
