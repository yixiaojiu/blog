import type { ReactNode } from 'react'
import styles from '../styles.module.css'
import { ArrowDefs, Box, Edge } from './diagram'

/**
 * 总览（封面）：左侧大标题，右侧三张章节卡片。
 * 卡片顶部的线条缩略图预告对应页的图形，坐标系 240×120。
 */

/** MaiBot：一条节点链，中间节点是 Planner */
const chainThumb = (
  <>
    <Box x={0} y={38} w={60} h={44} title="" />
    <Box x={90} y={38} w={60} h={44} title="" tone="accent" />
    <Box x={180} y={38} w={60} h={44} title="" />
    <Edge d="M60 60 H90" tone="accent" />
    <Edge d="M150 60 H180" tone="accent" />
  </>
)

/** Coopanion：事件流入 Agent，再绕回自身的循环 */
const loopThumb = (
  <>
    <Edge d="M0 60 H90" tone="muted" dashed />
    <Box x={90} y={38} w={60} h={44} title="" tone="accent" />
    <Edge d="M150 60 C 215 60, 215 6, 120 6 V38" tone="accent" />
  </>
)

/** 思考：一对引号 */
const quoteThumb = (
  <text x={0} y={110} className={styles.thumbQuote}>
    “ ”
  </text>
)

const CHAPTERS: { title: string; text: string; thumb: ReactNode }[] = [
  { title: 'MaiBot', text: '从消息到回复', thumb: chainThumb },
  { title: 'Coopanion', text: '事件驱动的 Agent Loop', thumb: loopThumb },
  { title: '一些思考', text: '关于 AI 陪伴', thumb: quoteThumb },
]

export default function OverviewSlide() {
  return (
    <div className={styles.cover}>
      {/* 缩略图里的箭头引用这里定义的 marker */}
      <svg width={0} height={0} aria-hidden="true">
        <ArrowDefs />
      </svg>

      <h1 className={styles.coverTitle}>
        AI 陪伴
        <br />
        架构与思考
      </h1>

      <div className={styles.coverCards}>
        {CHAPTERS.map((chapter, i) => (
          <div key={chapter.title} className={styles.card}>
            <svg
              className={styles.cardThumb}
              viewBox="0 0 240 120"
              aria-hidden="true"
            >
              {chapter.thumb}
            </svg>
            <span className={styles.cardIndex}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <h2 className={styles.cardTitle}>{chapter.title}</h2>
            <p className={styles.cardText}>{chapter.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
