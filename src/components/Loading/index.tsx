import clsx from 'clsx'
import { type ReactNode } from 'react'
import styles from './index.module.css'

interface LoadingProps {
  /**
   * 控制是否显示加载态。
   * 为 `false` 时直接渲染子内容，保持现有调用方式不变。
   */
  isLoading?: boolean
  /**
   * 加载完成后需要展示的内容。
   */
  children?: ReactNode
}

export function Loading({ isLoading = false, children }: LoadingProps) {
  if (!isLoading) {
    return <>{children}</>
  }

  return (
    <div
      className="flex flex-col items-center py-10"
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="页面内容加载中"
    >
      <svg
        viewBox="0 0 64 64"
        className={clsx('h-12 w-12', styles.loading)}
        aria-hidden="true"
      >
        {/** 轨道层提供稳定轮廓，让加载态在浅色和深色主题下都足够清晰。 */}
        <circle
          cx="32"
          cy="32"
          r="22"
          fill="none"
          stroke="var(--custom-color-outline)"
          strokeWidth="4"
          strokeOpacity="0.42"
        />

        {/**
         * 高亮圆弧仅保留一小段描边，再通过整体旋转表达加载状态。
         * 这种实现最克制，也和站点现有的简洁视觉风格更一致。
         */}
        <circle
          cx="32"
          cy="32"
          r="22"
          fill="none"
          stroke="var(--custom-color-primary)"
          strokeWidth="4"
          strokeLinecap="round"
          pathLength="100"
          className={styles.spinnerArc}
        />
      </svg>
    </div>
  )
}
