import { IPlayer } from './type'
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
