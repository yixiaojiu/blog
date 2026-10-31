import Slide from './Slide'
import { Box, Edge, Label, Zone } from './diagram'

/**
 * MaiBot：一条消息从接收到回复的链路。
 * 图按「注意力 → 决策 → 表达」三段从左到右排布，主链路用强调色，
 * 不回复的分支和学习回环用虚线/灰线，坐标系 1440×530。
 */

/** 主链路所在行：节点上沿与高度 */
const ROW_Y = 210
const ROW_H = 70
const MID = ROW_Y + ROW_H / 2
const ROW_BOTTOM = ROW_Y + ROW_H

/** 主链路上方的辅助框（注入的参考信息）所在行 */
const AUX_Y = 90
const AUX_H = 60
const AUX_BOTTOM = AUX_Y + AUX_H

/** 主链路下方的分支框所在行 */
const BRANCH_Y = 380
const BRANCH_H = 60

function MaiBotDiagram() {
  return (
    <>
      <Zone x={0} w={600} index="01" title="注意力" />
      <Zone x={650} w={290} index="02" title="决策" />
      <Zone x={1000} w={440} index="03" title="表达" />

      {/* ---------- 01 注意力 ---------- */}
      <Box x={0} y={ROW_Y} w={110} h={ROW_H} title="收到消息" />
      <Box x={150} y={ROW_Y} w={120} h={ROW_H} title="会话缓存" />
      <Box x={310} y={ROW_Y} w={110} h={ROW_H} title="Focus" />
      <Box x={460} y={ROW_Y} w={140} h={ROW_H} tone="accent" title="触发门控" />
      <Edge d={`M110 ${MID} H150`} tone="accent" />
      <Edge d={`M270 ${MID} H310`} tone="accent" />
      <Edge d={`M420 ${MID} H460`} tone="accent" />

      <Box x={460} y={AUX_Y} w={140} h={AUX_H} tone="soft" title="规则评分" />
      <Edge d={`M530 ${AUX_BOTTOM} V${ROW_Y}`} tone="muted" />

      {/* 没拿到 Focus 或没达到阈值：回到缓存继续旁听 */}
      <Edge d={`M365 ${ROW_BOTTOM} V330`} tone="muted" dashed arrow={false} />
      <Edge
        d={`M530 ${ROW_BOTTOM} V330 H210 V${ROW_BOTTOM + 4}`}
        tone="muted"
        dashed
      />
      <Label x={370} y={355} anchor="middle">
        旁听
      </Label>

      {/* ---------- 02 决策 ---------- */}
      <Box
        x={650}
        y={AUX_Y}
        w={260}
        h={AUX_H}
        tone="soft"
        title="记忆 · 人物画像 · 黑话"
      />
      <Edge d={`M780 ${AUX_BOTTOM} V${ROW_Y}`} tone="muted" />

      <Box x={660} y={ROW_Y} w={240} h={ROW_H} tone="accent" title="Planner" />
      <Edge d={`M600 ${MID} H660`} tone="accent" />

      {/* Planner 与工具之间的多轮循环 */}
      <Box
        x={660}
        y={BRANCH_Y}
        w={130}
        h={BRANCH_H}
        tone="soft"
        title="Tools 循环"
      />
      <Edge d={`M700 ${ROW_BOTTOM} V${BRANCH_Y}`} />
      <Edge d={`M750 ${BRANCH_Y} V${ROW_BOTTOM}`} />

      <Box x={820} y={BRANCH_Y} w={100} h={BRANCH_H} tone="soft" title="沉默" />
      <Edge d={`M870 ${ROW_BOTTOM} V${BRANCH_Y}`} tone="muted" dashed />

      {/* ---------- 03 表达 ---------- */}
      <Edge d={`M900 ${MID} H1000`} tone="accent" />

      <Box x={1000} y={ROW_Y} w={130} h={ROW_H} title="表达选择" />
      <Box x={1160} y={ROW_Y} w={130} h={ROW_H} tone="accent" title="Replyer" />
      <Box x={1320} y={ROW_Y} w={120} h={ROW_H} title="发送" />
      <Edge d={`M1130 ${MID} H1160`} tone="accent" />
      <Edge d={`M1290 ${MID} H1320`} tone="accent" />

      <Box
        x={1130}
        y={AUX_Y}
        w={190}
        h={AUX_H}
        tone="soft"
        title="人格 · 真实聊天"
      />
      <Edge d={`M1225 ${AUX_BOTTOM} V${ROW_Y}`} tone="muted" />

      {/* ---------- 学习回环：回复效果沉淀为下一次决策的参考 ---------- */}
      <Box
        x={1000}
        y={BRANCH_Y}
        w={290}
        h={BRANCH_H}
        tone="soft"
        title="学习回环"
      />
      <Edge
        d={`M1380 ${ROW_BOTTOM} V${BRANCH_Y + BRANCH_H / 2} H1290`}
        tone="muted"
        dashed
      />
      <Edge
        d={`M1145 ${BRANCH_Y + BRANCH_H} V490 H625 V${AUX_Y + AUX_H / 2} H650`}
        tone="muted"
        dashed
      />
    </>
  )
}

export default function MaiBotSlide() {
  return (
    <Slide
      title="MaiBot：从消息到回复"
      diagramLabel="MaiBot 架构：消息经会话缓存、Focus 与触发门控进入 Planner，Planner 通过工具循环决定行动或沉默，回复经表达选择交给 Replyer 生成并发送，回复效果沉淀到学习系统。"
      diagram={<MaiBotDiagram />}
    />
  )
}
