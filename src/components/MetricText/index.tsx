import type { ReactNode } from 'react'

type MetricTextType = 'success' | 'warning'

type MetricTextProps = {
  children: ReactNode
  type?: MetricTextType
}

const typeClassName: Record<MetricTextType, string> = {
  success: 'text-success',
  warning: 'text-warning',
}

export default function MetricText({
  children,
  type = 'success',
}: MetricTextProps) {
  return <span className={`${typeClassName[type]}`}>{children}</span>
}
