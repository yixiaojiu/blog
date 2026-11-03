import useBaseUrl from '@docusaurus/useBaseUrl'
import styles from '../styles.module.css'

/**
 * 视频封面：左侧标题，右侧两个项目 Logo。整体收在页面中部，四周留白。
 * Coopanion 的 Logo 是白底图，所以它的圆底用白色 + 浅绿描边，避免露出方框。
 */
export default function CoverSlide() {
  const maibotLogo = useBaseUrl('/img/presentation/ai-companion/maibot.webp')
  const coopanionLogo = useBaseUrl(
    '/img/presentation/ai-companion/coopanion.png'
  )

  return (
    <div className={styles.poster}>
      <h1 className={styles.posterTitle}>
        AI 陪伴
        <span className={styles.posterSubtitle}>开源项目分享与思考</span>
      </h1>

      <div className={styles.logos}>
        <figure className={styles.logo}>
          <div className={`${styles.logoDisc} ${styles.logoDiscMaibot}`}>
            <img src={maibotLogo} alt="MaiBot Logo" />
          </div>
          <figcaption>MaiBot</figcaption>
        </figure>

        <span className={styles.logoCross}>×</span>

        <figure className={styles.logo}>
          <div className={`${styles.logoDisc} ${styles.logoDiscCoopanion}`}>
            <img src={coopanionLogo} alt="Coopanion Logo" />
          </div>
          <figcaption>Coopanion</figcaption>
        </figure>
      </div>
    </div>
  )
}
