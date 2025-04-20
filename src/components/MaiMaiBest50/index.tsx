import { ScoreList } from './ScoreList'
import useSwr from 'swr'
import { IBest50, IPlayer } from './type'
import { Player } from './Player'

export const MaiMaiBest50 = () => {
  const { data, isLoading, error } = useSwr(
    '/maimai',
    async () => {
      try {
        const [playerResponse, scoreResponse] = await Promise.all([
          fetch('https://api.yixiaojiu.top/api/maimai/player'),
          fetch('https://api.yixiaojiu.top/api/maimai/best'),
        ])
        if (!playerResponse.ok || !scoreResponse.ok) {
          throw new Error(
            `HTTP error! status: ${playerResponse.status} ${scoreResponse.status}`
          )
        }

        const playerData = await playerResponse.json()
        const scoreData = await scoreResponse.json()

        if (playerData.code !== 200 || scoreData.code !== 200) {
          throw new Error(
            `Server error! status: ${playerData.code} ${scoreData.code}`
          )
        }

        return {
          player: playerData.data as IPlayer,
          score: scoreData.data as IBest50,
        }
      } catch {
        throw new Error('Failed to fetch data. Please try again later.')
      }
    },
    {
      // 禁用刷新
      refreshInterval: 0,
    }
  )

  if (isLoading) {
    return <div>加载中...</div>
  }

  if (error) {
    return <div>发生错误: {error}</div>
  }

  return (
    <div className="@container/main w-full">
      <div className="mx-auto max-w-[1200px]">
        <Player player={data.player} />
        <h3 className="text-center">Best35</h3>
        {data && <ScoreList scores={data.score.standard} />}
        <h3 className="mt-4 text-center">Best15</h3>
        {data && <ScoreList scores={data.score.dx} />}
      </div>
    </div>
  )
}
