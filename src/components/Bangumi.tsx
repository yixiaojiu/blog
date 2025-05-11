import { defineCustomElements } from 'bilibili-bangumi-component/loader'

defineCustomElements()

export function Bangumi() {
  return (
    // @ts-expect-error
    <bilibili-bangumi api="https://yixiaojiu-bangumi.web.val.run"></bilibili-bangumi>
  )
}
