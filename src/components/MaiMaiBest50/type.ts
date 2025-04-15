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
}
