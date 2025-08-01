import styles from './index.module.css'
import clsx from 'clsx'

interface LoadingProps {
  isLoading?: boolean
  children?: React.ReactNode
}

export function Loading({ isLoading = false, children }: LoadingProps) {
  if (!isLoading) {
    return children
  }

  return (
    <div className="flex flex-col items-center py-10">
      <img
        src="/img/loading.webp"
        className={clsx('w-15 h-15', styles.loading)}
        alt="loading status"
      />
      <p className="mt-2 text-sm text-gray-500">Loading...</p>
    </div>
  )
}
