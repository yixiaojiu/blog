import { mockData } from './mock'

import { useState, useEffect } from 'react'
import { ScoreList } from './ScoreList'

export const MaiMaiBest50 = () => {
  // 存储数据
  const [data, setData] = useState(null)
  // 标记是否正在加载
  const [loading, setLoading] = useState(true)
  // 存储错误信息
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://api.yixiaojiu.top/api/maimai/best'
        )
        if (!response.ok) {
          setError(`HTTP error! status: ${response.status}`)
        }
        const result = await response.json()
        setData(result.data)
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div>加载中...</div>
  }

  if (error) {
    return <div>发生错误: {error}</div>
  }

  return (
    <div className="max-w-[700px]">
      <h3>Best35</h3>
      {data && <ScoreList scores={data.standard} />}
      <h3>Best15</h3>
      {data && <ScoreList scores={data.dx} />}
    </div>
  )
}
