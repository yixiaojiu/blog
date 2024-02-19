import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { getRandomNumber } from '@site/src/lib/utils'
import Button from '@site/src/components/Button'
import styles from './styles.module.css'
import { useHistory } from '@docusaurus/router'

const BILIBILI_COMIC_URL = 'https://yixiaojiu-bilibili_comic.web.val.run'
const DEFAULT_COMIC_LIST = [
  'http://activity.hdslb.com/zzjs/cartoon/errorPage-manga-1.png',
  'http://activity.hdslb.com/zzjs/cartoon/errorPage-manga-2.png',
  'http://activity.hdslb.com/zzjs/cartoon/errorPage-manga-3.png',
  'http://activity.hdslb.com/zzjs/cartoon/errorPage-manga-4.png',
  'http://activity.hdslb.com/zzjs/cartoon/errorPage-manga-5.png',
  'http://activity.hdslb.com/zzjs/cartoon/errorPage-manga-6.png',
  'http://activity.hdslb.com/zzjs/cartoon/errorPage-manga-7.png',
]

export default function DesktopContent() {
  const [comicList, setComicList] = useState(DEFAULT_COMIC_LIST)
  const [comicIndex, setComicIndex] = useState(
    getRandomNumber(comicList.length)
  )
  const [comic, setComic] = useState(comicList[comicIndex])
  const history = useHistory()

  const changeComic = () => {
    const newComicIndex = getRandomNumber(comicList.length, comicIndex)
    setComicIndex(newComicIndex)
    setComic(comicList[newComicIndex])
  }

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch(BILIBILI_COMIC_URL)
        const list = ((await res.json()) as any).data as string[]
        if (list.length) {
          setComicList(list)
        }
      } catch {}
    })()
  }, [])

  return (
    <main className={clsx('container margin-vert--xl')}>
      <div className="row flex-col justify-center">
        <div className="flex items-center justify-center w-full">
          <img src="http://static.hdslb.com/error/very_sorry.png" />
        </div>
        <div className="flex margin-bottom--lg justify-center w-full">
          <Button className="margin-right--md" onClick={() => history.goBack()}>
            返回上一页
          </Button>
          <Button onClick={() => history.replace('/')}>回到首页</Button>
        </div>
        <div id="up" className={clsx(styles.split, 'w-full')} />
        <div className={clsx(styles.comic, 'w-full')}>
          {/* @ts-expect-error */}
          <img src={comic} alt="comic" referrerpolicy="no-referrer" />
          <Button
            as="a"
            onClick={changeComic}
            href="#up"
            className={styles.change_comic_btn}
          >
            换一张
          </Button>
          <a href=""></a>
        </div>
      </div>
    </main>
  )
}
