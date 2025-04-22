import { ScoreList } from './ScoreList'
import useSwr from 'swr'
import { IBest50, IPlayer } from './type'
import { getTrophyColor, getDeluxeRatingGradient } from './utils'

interface PlayerProps {
  player: IPlayer
}

export const Player = ({ player }: PlayerProps) => {
  return (
    <div className="w-full relative min-h-[120px] rounded-lg overflow-x-hidden">
      <img
        className="@3xl/main:w-full @max-3xl/main:h-full block"
        loading="lazy"
        src={`https://assets2.lxns.net/maimai/plate/${player.name_plate.id || 0}.png`}
      />
      <div className="absolute w-full h-full left-0 top-0 px-4 flex gap-4 @max-3xl/main:gap-2">
        <div className="h-full py-4">
          <img
            className="h-full block"
            loading="lazy"
            src={`https://assets2.lxns.net/maimai/icon/${player.icon.id || 0}.png`}
          />
        </div>
        <div className="flex-1 flex flex-col gap-2 h-full py-2">
          <div className="flex gap-6 items-center">
            <div
              style={{
                background: `linear-gradient(45deg, ${getDeluxeRatingGradient(player.rating).from} 0%, ${getDeluxeRatingGradient(player.rating).to} 100%)`,
              }}
              className="text-white text-xs px-4 py-1 rounded-sm h-fit"
            >
              DX Rating: <span className="font-bold">{player.rating}</span>
            </div>
            <img
              className="h-8"
              loading="lazy"
              src={`https://maimai.lxns.net/assets/maimai/class_rank/${player.class_rank || 0}.webp`}
            />
          </div>
          <div className="flex items-center gap-4 px-2 py-1 w-fit bg-white rounded-sm text-black font-bold whitespace-pre">
            <span>{player.name}</span>
            <img
              className="h-8"
              loading="lazy"
              src={`https://maimai.lxns.net/assets/maimai/course_rank/${player.course_rank || 0}.webp`}
            />
          </div>
          <div
            style={{
              color: getTrophyColor(player.trophy.color),
            }}
            className="rounded-lg text-center w-[200px] text-xs bg-stone-100"
          >
            {player.trophy.name}
          </div>
        </div>
      </div>
    </div>
  )
}

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
      <div className="mx-auto max-w-[1200px] @4xl/main:px-6">
        <div className="mx-auto max-w-[800px] mb-3">
          <Player player={data.player} />
        </div>
        <h3 className="text-center">Best35</h3>
        {data && <ScoreList scores={data.score.standard} />}
        <h3 className="mt-4 text-center">Best15</h3>
        {data && <ScoreList scores={data.score.dx} />}
      </div>
    </div>
  )
}
