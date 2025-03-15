import React, { useMemo, type ReactNode } from 'react'
import clsx from 'clsx'
import IconPen from '@site/src/svg/pen.svg'
import IconClockRotateLeft from '@site/src/svg/clock-rotate-left.svg'
import IconClock from '@site/src/svg/clock.svg'
import { useBlogPost } from '@docusaurus/plugin-content-blog/client'
import { PropBlogPostMetadata } from '@docusaurus/plugin-content-blog'
import BlogPostItemHeader from '@theme/BlogPostItem/Header'
import BlogPostItemContent from '@theme/BlogPostItem/Content'
import { useWindowSize } from '@docusaurus/theme-common'
import Link from '@site/src/components/Link'
import styles from './styles.module.css'
import { useConfigCustomFields } from '@site/src/lib/hooks/something'
import type { Props } from '@theme/BlogPostItem'
import type { AllBlogFrontMatter } from '@site/src/lib/types/something'

const Image = ({ frontMatter }: { frontMatter: AllBlogFrontMatter }) => {
  const { defaultBlogImage } = useConfigCustomFields()

  return (
    <div className="aspect-3/2 w-2/5 m-2 rounded-lg overflow-hidden relative">
      <img
        src={frontMatter.img ?? defaultBlogImage}
        className="object-cover h-full w-full"
      />
      <div className="absolute w-full h-full bg-gray-700/20 z-1 top-0 left-0" />
    </div>
  )
}

const Information = ({ metadata }: { metadata: PropBlogPostMetadata }) => {
  const windowSize = useWindowSize()

  const title = useMemo(() => {
    const flag = windowSize === 'desktop' ? 20 : 10
    return metadata.title.length > flag
      ? metadata.title.slice(0, flag) + '...'
      : metadata.title
  }, [metadata.title, windowSize])

  const attributes = useMemo(() => {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }

    const list = [
      {
        Icon: IconClock,
        label: Math.floor(metadata.readingTime) + 'min',
      },
      {
        Icon: IconPen,
        label: new Date(metadata.date)
          // @ts-expect-error
          .toLocaleString(undefined, options)
          .replace(/\//g, '-'),
      },
    ]

    if (metadata.lastUpdatedAt) {
      list.push({
        Icon: IconClockRotateLeft,
        label: new Date(metadata.lastUpdatedAt)
          // @ts-expect-error
          .toLocaleString(undefined, options)
          .replace(/\//g, '-'),
      })
    }
    return list
  }, [metadata])

  return (
    <div className="flex-1 px-6 flex flex-col items-center justify-center gap-1">
      {/* 使用 Tooltip 展示完整 */}
      <Link to={metadata.permalink} className={clsx('font-bold')}>
        {title}
      </Link>
      <div className="flex gap-x-2 text-xs text-gray-500">
        {attributes.map(({ Icon, label }) => (
          <div className="flex items-center justify-center gap-x-1">
            <Icon className="w-3 h-3" />
            <span>{label}</span>
          </div>
        ))}
      </div>
      <p className={clsx(styles.multipleText, 'text-xs text-gray-500')}>
        {metadata.description}
      </p>
    </div>
  )
}

interface BlogPostItemProps extends Props {
  isOdd: boolean
}

export default function BlogPostItem({
  children,
  isOdd,
}: BlogPostItemProps): ReactNode {
  const { isBlogPostPage, frontMatter, metadata } = useBlogPost()

  return (
    <>
      {isBlogPostPage ? (
        <article>
          <BlogPostItemHeader />
          <BlogPostItemContent>{children}</BlogPostItemContent>
        </article>
      ) : (
        <div className="my-4 border border-gray-100 flex rounded-2xl">
          {isOdd ? (
            <>
              <Image frontMatter={frontMatter} />
              <Information metadata={metadata} />
            </>
          ) : (
            <>
              <Information metadata={metadata} />
              <Image frontMatter={frontMatter} />
            </>
          )}
        </div>
      )}
    </>
  )
}
