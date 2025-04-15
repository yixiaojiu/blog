import type { IScore } from './type'
import { maimaiDifficultyColor } from './constants'
import clsx from 'clsx'
import styles from './styles.module.css'
import { getTransparentColor } from './utils'

interface ScoreListProps {
  scores: IScore[]
}

export const ScoreList = ({ scores }: ScoreListProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {scores.map((score) => {
        return (
          <div
            key={score.song_name}
            className="rounded-lg bg-cover bg-center bg-no-repeat"
            style={{
              border: `2px solid ${maimaiDifficultyColor[2][score.level_index]}`,
              backgroundImage: `url(https://assets.lxns.net/maimai/jacket/${score.id}.png!webp)`,
            }}
          >
            <div
              className="flex pt-1 pb-[2px] px-3 gap-x-1"
              style={{
                backgroundColor: getTransparentColor(
                  maimaiDifficultyColor[2][score.level_index],
                  0.95
                ),
              }}
            >
              <div
                className={clsx(
                  styles.truncate,
                  'flex-1 font-medium text-white text-sm'
                )}
              >
                {score.song_name}
              </div>
              {score.type === 'dx' && (
                <div className="text-white bg-[#FD7E14] text-[10px] px-2 rounded-2xl font-bold py-[1px]">
                  DX
                </div>
              )}
              {score.type === 'standard' && (
                <div className="text-white bg-[#228BE6] text-[10px] px-2 rounded-2xl font-bold py-[1px]">
                  标准
                </div>
              )}
            </div>
            <div
              style={{
                backgroundColor: getTransparentColor(
                  maimaiDifficultyColor[2][score.level_index],
                  0.7
                ),
              }}
              className="flex items-center justify-between px-3 py-1"
            >
              <div className="text-white">
                <div>
                  <span className="text-2xl">
                    {parseInt(score.achievements.toString())}
                  </span>
                  <span>
                    .
                    {(String(score.achievements).split('.')[1] || '0').padEnd(
                      4,
                      '0'
                    )}
                    %
                  </span>
                </div>
                <div className="text-[12px]">
                  DX Rating: {parseInt(score.dx_rating.toString())}
                </div>
              </div>

              <div className="text-black bg-white border border-[#DEE2E6] rounded-lg px-1 py-1">
                {score.level}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
