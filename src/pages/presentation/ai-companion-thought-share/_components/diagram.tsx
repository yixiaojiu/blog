import clsx from 'clsx'
import type { ReactNode } from 'react'
import styles from '../styles.module.css'

/**
 * 架构图用的 SVG 基础图元。
 * 所有坐标都直接写在各页的 viewBox 坐标系里，图元只负责统一样式，不做自动布局。
 */

/** 节点语气：plain 普通节点，accent 主角节点，soft 虚线的辅助/上下文节点 */
export type Tone = 'plain' | 'accent' | 'soft'

/** 连线语气，对应三种箭头颜色 */
type EdgeTone = 'ink' | 'muted' | 'accent'

const markerId = (tone: EdgeTone) => `arrow-${tone}`

/**
 * 箭头定义。每个 SVG 里放一份；同一时间只渲染一页，所以固定 id 不会冲突。
 */
export function ArrowDefs() {
  return (
    <defs>
      {(['ink', 'muted', 'accent'] as const).map((tone) => (
        <marker
          key={tone}
          id={markerId(tone)}
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0 0 L10 5 L0 10 z" className={styles[`arrow_${tone}`]} />
        </marker>
      ))}
    </defs>
  )
}

interface EdgeProps {
  /** SVG path 数据 */
  d: string
  tone?: EdgeTone
  dashed?: boolean
  /** 是否在终点画箭头，纯连接线（如汇合线）传 false */
  arrow?: boolean
}

export function Edge({ d, tone = 'ink', dashed, arrow = true }: EdgeProps) {
  return (
    <path
      d={d}
      className={clsx(styles.edge, styles[`edge_${tone}`], {
        [styles.edgeDashed]: dashed,
      })}
      markerEnd={arrow ? `url(#${markerId(tone)})` : undefined}
    />
  )
}

interface BoxProps {
  x: number
  y: number
  w: number
  h: number
  title: string
  /** 标题下方的说明行，每项一行 */
  lines?: string[]
  tone?: Tone
  /** 文本对齐方式；多行说明较长时用 left 更易读 */
  align?: 'center' | 'left'
}

/** 标题行与说明行的字号/行距，和 CSS 中 .boxTitle / .boxLine 保持一致 */
const TITLE_SIZE = 17
const LINE_GAP = 20

/**
 * 带标题和说明行的矩形节点，文本块在矩形内垂直居中。
 */
export function Box({
  x,
  y,
  w,
  h,
  title,
  lines = [],
  tone = 'plain',
  align = 'center',
}: BoxProps) {
  // 文本块总高度 = 标题 + 说明行，用于计算垂直居中的起点
  const blockHeight = TITLE_SIZE + lines.length * LINE_GAP
  const top = y + (h - blockHeight) / 2
  const textX = align === 'center' ? x + w / 2 : x + 20
  const anchor = align === 'center' ? 'middle' : 'start'

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={10}
        className={clsx(styles.box, styles[`box_${tone}`])}
      />
      <text
        x={textX}
        y={top + TITLE_SIZE - 3}
        textAnchor={anchor}
        className={styles.boxTitle}
      >
        {title}
      </text>
      {lines.map((line, i) => (
        <text
          key={line}
          x={textX}
          y={top + TITLE_SIZE + (i + 1) * LINE_GAP - 3}
          textAnchor={anchor}
          className={styles.boxLine}
        >
          {line}
        </text>
      ))}
    </g>
  )
}

interface LabelProps {
  x: number
  y: number
  children: ReactNode
  anchor?: 'start' | 'middle' | 'end'
  /** muted 说明文字，strong 小标题，accent 强调，code 等宽代码 */
  variant?: 'muted' | 'strong' | 'accent' | 'code'
}

/** 图中的自由文本标注 */
export function Label({
  x,
  y,
  children,
  anchor = 'start',
  variant = 'muted',
}: LabelProps) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      className={styles[`label_${variant}`]}
    >
      {children}
    </text>
  )
}

interface ZoneProps {
  x: number
  w: number
  index: string
  title: string
}

/** 图顶部的分区标题：编号 + 标题 + 一条横线，用来划分阶段而不画框 */
export function Zone({ x, w, index, title }: ZoneProps) {
  return (
    <g>
      <text x={x} y={22} className={styles.label_accent}>
        {index}
      </text>
      <text x={x + 30} y={22} className={styles.label_strong}>
        {title}
      </text>
      <line x1={x} x2={x + w} y1={36} y2={36} className={styles.zoneRule} />
    </g>
  )
}

interface PanelProps {
  x: number
  y: number
  w: number
  h: number
  title: string
  subtitle?: string
  tone?: Tone
  /** 面板内部的自定义内容，坐标仍使用整张图的坐标系 */
  children?: ReactNode
}

/** 标题在左上角的大容器，内部内容由调用方自行排布 */
export function Panel({
  x,
  y,
  w,
  h,
  title,
  subtitle,
  tone = 'plain',
  children,
}: PanelProps) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={10}
        className={clsx(styles.box, styles[`box_${tone}`])}
      />
      <text x={x + 20} y={y + 32} className={styles.boxTitle}>
        {title}
      </text>
      {subtitle && (
        <text x={x + 20} y={y + 54} className={styles.boxLine}>
          {subtitle}
        </text>
      )}
      {children}
    </g>
  )
}

/** 12px 字号下的字宽估算：等宽 ASCII 约 7.4px，中文约 12px */
const CHIP_ASCII_WIDTH = 7.4
const CHIP_CJK_WIDTH = 12
const CHIP_PADDING = 10

/**
 * 估算胶囊标签宽度。SVG 文本无法自动撑开 rect，所以按字符类型估算，
 * 调用方也用它来决定标签后文字的起点。
 */
export function chipWidth(text: string) {
  const textWidth = [...text].reduce(
    (sum, char) =>
      sum + (char.charCodeAt(0) > 0xff ? CHIP_CJK_WIDTH : CHIP_ASCII_WIDTH),
    0
  )
  return textWidth + CHIP_PADDING * 2
}

/** 胶囊形的事件标签，x、y 为胶囊左侧与文字基线位置 */
export function Chip({ x, y, text }: { x: number; y: number; text: string }) {
  return (
    <g>
      <rect
        x={x}
        y={y - 15}
        width={chipWidth(text)}
        height={22}
        rx={11}
        className={styles.chip}
      />
      <text x={x + CHIP_PADDING} y={y} className={styles.chipText}>
        {text}
      </text>
    </g>
  )
}
