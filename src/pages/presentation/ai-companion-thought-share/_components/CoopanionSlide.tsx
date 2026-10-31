import { Fragment } from 'react'
import styles from '../styles.module.css'
import Slide from './Slide'
import { Box, Chip, Edge, Label, Panel, Zone, chipWidth } from './diagram'

/**
 * Coopanion：事件驱动的 Agent Loop。
 * 左侧三块构成闭环：World 推事件 → Event Bus 按触发策略唤醒 → Agent 调工具回到 World；
 * 右侧用「VTuber 边玩游戏边看弹幕」的时间线展示同一套机制在直播场景里的效果。坐标系 1440×530。
 */

/** Event Bus 里的触发策略：[策略名, 含义] */
const TRIGGERS: [string, string][] = [
  ['preempt', '打断重想'],
  ['flush', '立即唤醒'],
  ['debounce', '合批唤醒'],
  ['piggyback', '顺路带上'],
  ['heartbeat', '定时唤醒'],
]

/** 场景时间线：[事件, 效果] */
const TIMELINE: [string, string][] = [
  ['将军', '立即反应'],
  ['弹幕 ×3', '合批回应'],
  ['演出状态', '顺路带上'],
  ['打断', '回报播到哪'],
  ['冷场', '主动找话'],
]

/** 时间线轴线 x 坐标、首条目 y 坐标和条目间距 */
const AXIS_X = 1000
const FIRST_Y = 120
const STEP = 80

function CoopanionDiagram() {
  return (
    <>
      <Zone x={0} w={360} index="01" title="World" />
      <Zone x={440} w={360} index="02" title="Core" />
      <Zone x={960} w={480} index="03" title="直播：边玩游戏边看弹幕" />

      {/* ---------- 01 World 插件层 ---------- */}
      <Panel x={0} y={60} w={360} h={440} tone="soft" title="World 插件" />
      <Box x={20} y={120} w={320} h={100} title="游戏 World" />
      <Box x={20} y={240} w={320} h={100} tone="accent" title="VTuber World" />
      <Box x={20} y={360} w={320} h={100} tone="soft" title="更多 World…" />

      {/* ---------- 02 Core：Event Bus + Agent Loop ---------- */}
      <Panel x={440} y={60} w={360} h={250} title="Event Bus">
        {TRIGGERS.map(([name, desc], i) => (
          <Fragment key={name}>
            <Chip x={470} y={122 + i * 38} text={name} />
            <Label x={620} y={122 + i * 38}>
              {desc}
            </Label>
          </Fragment>
        ))}
      </Panel>

      <Panel x={440} y={360} w={360} h={140} tone="accent" title="Agent Loop" />
      <Box x={460} y={420} w={96} h={50} title="上下文" />
      <Box x={592} y={420} w={76} h={50} title="LLM" />
      <Box x={704} y={420} w={76} h={50} title="Tools" />
      <Edge d="M556 445 H592" />
      <Edge d="M668 445 H704" />

      {/* 闭环：World → Event Bus → Agent Loop → World */}
      <Edge d="M360 100 H440" tone="accent" />
      <Label x={400} y={90} anchor="middle" variant="accent">
        事件
      </Label>
      <Edge d="M620 310 V360" tone="accent" />
      <Label x={632} y={340} variant="accent">
        唤醒
      </Label>
      <Edge d="M440 470 H360" />
      <Label x={400} y={460} anchor="middle" variant="strong">
        工具
      </Label>

      {/* ---------- 03 场景时间线 ---------- */}
      <line
        x1={AXIS_X}
        x2={AXIS_X}
        y1={FIRST_Y - 30}
        y2={FIRST_Y + STEP * (TIMELINE.length - 1) + 30}
        className={styles.timelineAxis}
      />
      {TIMELINE.map(([event, effect], i) => {
        const y = FIRST_Y + i * STEP
        return (
          <g key={event}>
            <circle
              cx={AXIS_X}
              cy={y - 4}
              r={6}
              className={styles.timelineDot}
            />
            <Chip x={AXIS_X + 24} y={y} text={event} />
            <Label
              x={AXIS_X + 24 + chipWidth(event) + 16}
              y={y}
              variant="strong"
            >
              {effect}
            </Label>
          </g>
        )
      })}
    </>
  )
}

export default function CoopanionSlide() {
  return (
    <Slide
      title="Coopanion：事件驱动的 Agent Loop"
      diagramLabel="Coopanion 架构：游戏 World 和 VTuber World 把事件推入 Core 的 Event Bus，Event Bus 按触发策略唤醒 Agent Loop，Agent 通过工具回到各个 World；右侧时间线展示直播边玩游戏边看弹幕时各类事件的处理方式。"
      diagram={<CoopanionDiagram />}
    />
  )
}
