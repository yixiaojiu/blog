import type { ReactNode } from 'react'
import styles from '../styles.module.css'
import { ArrowDefs } from './diagram'

/** 架构图的设计坐标尺寸，与 .diagram 的 CSS 宽高一致 */
const DIAGRAM_WIDTH = 1440
const DIAGRAM_HEIGHT = 530

interface SlideProps {
  title: string
  /** 架构图的 SVG 内容，坐标系为 1440×530 */
  diagram: ReactNode
  /** 图的无障碍描述 */
  diagramLabel: string
}

/**
 * 单页 PPT 的统一版式：标题 + 架构图。讲解内容靠口述，页面上不放说明文字。
 */
export default function Slide({ title, diagram, diagramLabel }: SlideProps) {
  return (
    <>
      <h1 className={styles.title}>{title}</h1>
      <svg
        className={styles.diagram}
        viewBox={`0 0 ${DIAGRAM_WIDTH} ${DIAGRAM_HEIGHT}`}
        role="img"
        aria-label={diagramLabel}
      >
        <ArrowDefs />
        {diagram}
      </svg>
    </>
  )
}
