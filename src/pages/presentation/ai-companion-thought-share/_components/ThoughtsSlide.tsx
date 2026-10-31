import styles from '../styles.module.css'

/**
 * 关于 AI 陪伴的一些思考：三栏卡片，大关键词 + 一句陈述 + 少量要点，细节口头讲。
 */

interface Thought {
  /** 卡片顶部的大号关键词 */
  keyword: string
  statement: string
  points: string[]
  /** 要点下方的胶囊标签，例如角色名 */
  tags?: string[]
}

const THOUGHTS: Thought[] = [
  {
    keyword: 'AI 味',
    statement: '主流 LLM 都在训练 Agent 能力，Role Play 的 AI 味很重',
    points: ['为角色微调小模型', '打造有趣的角色'],
    tags: ['Neuro-sama', '可缇Corti', 'Shizuku'],
  },
  {
    keyword: '小众？',
    statement: '很多人在做自己的 AI 伙伴，但顶流很少',
    points: ['宣发强如 Project N.E.K.O，用户量也不高'],
  },
  {
    keyword: 'IP',
    statement: '流量来自 IP 与社区',
    points: ['DeepSeek 刷 B 站插件：功能早有人做，二创社区带来巨大流量'],
  },
]

export default function ThoughtsSlide() {
  return (
    <>
      <h1 className={styles.title}>关于 AI 陪伴的一些思考</h1>
      <div className={styles.thoughts}>
        {THOUGHTS.map((thought) => (
          <div key={thought.keyword} className={styles.card}>
            <span className={styles.keyword}>{thought.keyword}</span>
            <p className={styles.statement}>{thought.statement}</p>
            <ul className={styles.points}>
              {thought.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            {thought.tags && (
              <div className={styles.tags}>
                {thought.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  )
}
