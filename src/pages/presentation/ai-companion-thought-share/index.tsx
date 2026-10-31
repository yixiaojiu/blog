import Head from '@docusaurus/Head'
import { useEffect, useRef, useState } from 'react'
import CoopanionSlide from './_components/CoopanionSlide'
import MaiBotSlide from './_components/MaiBotSlide'
import OverviewSlide from './_components/OverviewSlide'
import ThoughtsSlide from './_components/ThoughtsSlide'
import styles from './styles.module.css'

/** 舞台设计尺寸，与 .stage 的 CSS 宽高一致 */
const STAGE_WIDTH = 1600
const STAGE_HEIGHT = 900

const slides = [OverviewSlide, MaiBotSlide, CoopanionSlide, ThoughtsSlide]

/**
 * AI 陪伴技术分享 PPT。
 * 舞台按 1600×900 设计，等比缩放到视口；← / → / 空格翻页，F 切换全屏。
 */
export default function AiCompanionThoughtShare() {
  const [index, setIndex] = useState(0)
  const [scale, setScale] = useState(0)
  const viewportRef = useRef<HTMLDivElement>(null)

  // 视口尺寸变化（含进入全屏）时重新计算缩放，保证舞台完整可见
  useEffect(() => {
    const updateScale = () =>
      setScale(
        Math.min(
          window.innerWidth / STAGE_WIDTH,
          window.innerHeight / STAGE_HEIGHT
        )
      )
    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(event.key)) {
        event.preventDefault()
        setIndex((i) => Math.min(i + 1, slides.length - 1))
      } else if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(event.key)) {
        event.preventDefault()
        setIndex((i) => Math.max(i - 1, 0))
      } else if (event.key === 'f' || event.key === 'F') {
        if (document.fullscreenElement) {
          void document.exitFullscreen()
        } else {
          void viewportRef.current?.requestFullscreen()
        }
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const CurrentSlide = slides[index]

  return (
    <div ref={viewportRef} className={styles.viewport}>
      <Head>
        <title>MaiBot 与 Coopanion 的架构设计</title>
        <meta
          name="description"
          content="AI 陪伴技术分享：MaiBot 与 Coopanion 的架构设计"
        />
      </Head>
      <section
        className={styles.stage}
        style={{ transform: `translate(-50%, -50%) scale(${scale})` }}
      >
        <CurrentSlide />
        <div className={styles.pageNumber}>
          {String(index + 1).padStart(2, '0')} /{' '}
          {String(slides.length).padStart(2, '0')}
        </div>
      </section>
    </div>
  )
}
