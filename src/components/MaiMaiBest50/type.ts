export interface IBest50 {
  standard: IScore[]
  dx: IScore[]
}

export interface IScore {
  id: number
  song_name: string
  level: string
  level_index: number
  achievements: number
  fc: string | null
  fs: string
  dx_score: number
  dx_rating: number
  rate: string
  type: string
  play_time?: string
  upload_time?: string
  level_value: string
}

export interface IPlayer {
  name: string
  rating: number
  friend_code: number
  trophy?: {
    name: string
    color: string
  }
  course_rank: number
  class_rank: number
  star: number
  icon?: ICollection
  name_plate?: ICollection
  frame?: ICollection
  upload_time: string
}

export interface ICollection {
  id: number
  name: string
  level?: number
}

export interface Trophy {
  id: number
  name: string
  color: string
}

export interface AvatarIcon {
  id: number
  name: string
  genre: string
}

export interface NamePlate {
  id: number
  name: string
  genre: string
}

export interface Frame {
  id: number
  name: string
  genre: string
}
