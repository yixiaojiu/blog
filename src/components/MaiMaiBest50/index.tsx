import { ScoreList } from './ScoreList'
import useSwr from 'swr'
import { IBest50, IPlayer } from './type'
import { Player } from './Player'
import React from 'react'
import { ShowError } from '@site/src/components/ShowError'
import { Loading } from '@site/src/components/Loading'

export const MaiMaiBest50 = () => {
  const { data, error, isLoading } = useSwr(
    '/maimai',
    async () => {
      const res = await fetch('https://api.yixiaojiu.top/api/edge/maimai/data')

      const resData = await res.json()

      if (resData.code === 200) {
        return resData.data as {
          player: IPlayer
          score: IBest50
        }
      } else {
        throw new Error(resData.message)
      }
    },
    {
      // 禁用刷新
      refreshInterval: 0,
    }
  )

  if (error) {
    return <ShowError error={error} />
  }

  return (
    <Loading isLoading={isLoading}>
      {data && (
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
      )}
    </Loading>
  )
}
