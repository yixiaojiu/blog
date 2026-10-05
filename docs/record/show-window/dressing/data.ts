import photo20261006_002016 from './images/2026-10-06_00-20-16.webp'
import photo20261006_002434 from './images/2026-10-06_00-24-34.webp'
import photo20261005_004323 from './images/2026-10-05_00-43-23.webp'
import photo20261004_113404 from './images/2026-10-04_11-34-04.webp'
import photo20261004_152223 from './images/2026-10-04_15-22-23.webp'
import photo20261004_01 from './images/2026-10-04_01.webp'
import photo20261004_02 from './images/2026-10-04_02.webp'
import photo20261004_03 from './images/2026-10-04_03.webp'
import photo20261002_012346 from './images/2026-10-02_01-23-46.webp'
import photo20261002_012745 from './images/2026-10-02_01-27-45.webp'
import photo20261002_015507 from './images/2026-10-02_01-55-07.webp'
import photo20260913_223705 from './images/2026-09-13_22-37-05.webp'
import photo20260913_224330 from './images/2026-09-13_22-43-30.webp'
import photo20260904_000843 from './images/2026-09-04_00-08-43.webp'
import photo20260805_234625 from './images/2026-08-05_23-46-25.webp'
import photo20260730_234141 from './images/2026-07-30_23-41-41.webp'
import photo20260718_174202 from './images/2026-07-18_17-42-02.webp'
import photo20260711_090440 from './images/2026-07-11_09-04-40.webp'
import photo20260711_161844 from './images/2026-07-11_16-18-44.webp'
import photo20260711_162240 from './images/2026-07-11_16-22-40.webp'
import photo20260601_235904 from './images/2026-06-01_23-59-04.webp'
import photo20260223_133752 from './images/2026-02-23_13-37-52.webp'
import photo20260223_134138 from './images/2026-02-23_13-41-38.webp'

// month 使用 YYYY-MM；月份和拍摄日倒序，每个子数组对应同一天，照片按数组顺序展示，宽度不足时行内换行。
export const months: {
  month: string
  photos: { src: string; alt: string }[][]
}[] = [
  {
    month: '2026-10',
    photos: [
      [
        { src: photo20261005_004323, alt: '2026-10-04 穿搭记录' },
        { src: photo20261004_113404, alt: '2026-10-04 穿搭记录' },
        { src: photo20261006_002016, alt: '2026-10-04 穿搭记录' },
        { src: photo20261006_002434, alt: '2026-10-04 穿搭记录' },
        { src: photo20261004_01, alt: '2026-10-04 穿搭记录' },
        { src: photo20261004_03, alt: '2026-10-04 穿搭记录' },
        { src: photo20261004_152223, alt: '2026-10-04 穿搭记录' },
        { src: photo20261004_02, alt: '2026-10-04 穿搭记录' },
      ],
      [
        { src: photo20261002_012346, alt: '2026-10-02 01:23:46 穿搭记录' },
        { src: photo20261002_012745, alt: '2026-10-02 01:27:45 穿搭记录' },
        { src: photo20261002_015507, alt: '2026-10-02 01:55:07 穿搭记录' },
      ],
    ],
  },
  {
    month: '2026-09',
    photos: [
      [
        { src: photo20260913_223705, alt: '2026-09-13 22:37:05 穿搭记录' },
        { src: photo20260913_224330, alt: '2026-09-13 22:43:30 穿搭记录' },
      ],
      [{ src: photo20260904_000843, alt: '2026-09-04 00:08:43 穿搭记录' }],
    ],
  },
  {
    month: '2026-08',
    photos: [
      [{ src: photo20260805_234625, alt: '2026-08-05 23:46:25 穿搭记录' }],
    ],
  },
  {
    month: '2026-07',
    photos: [
      [{ src: photo20260730_234141, alt: '2026-07-30 23:41:41 穿搭记录' }],
      [{ src: photo20260718_174202, alt: '2026-07-18 17:42:02 穿搭记录' }],
      [
        { src: photo20260711_090440, alt: '2026-07-11 09:04:40 穿搭记录' },
        { src: photo20260711_161844, alt: '2026-07-11 16:18:44 穿搭记录' },
        { src: photo20260711_162240, alt: '2026-07-11 16:22:40 穿搭记录' },
      ],
    ],
  },
  {
    month: '2026-06',
    photos: [
      [{ src: photo20260601_235904, alt: '2026-06-01 23:59:04 穿搭记录' }],
    ],
  },
  {
    month: '2026-02',
    photos: [
      [
        { src: photo20260223_133752, alt: '2026-02-23 13:37:52 穿搭记录' },
        { src: photo20260223_134138, alt: '2026-02-23 13:41:38 穿搭记录' },
      ],
    ],
  },
]
